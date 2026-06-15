import "dotenv/config";
import express from "express";
import cors from "cors";
import { createServer } from "http";
import { timingSafeEqual } from "crypto";
import { Server } from "socket.io";

const app = express();
app.use(cors());
app.use(express.json({ limit: "1kb" }));

const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
  path: "/socket.io"
});

const PORT = process.env.PORT || 3005;
const MASTER_SECRET = process.env.MASTER_SECRET || "change-me-please";
const ADMIN_SECRET = process.env.ADMIN_SECRET || "";
const roomStates = new Map();

if (MASTER_SECRET === "change-me-please") {
  console.warn(
    "WARNING: Set MASTER_SECRET in multiplex_client/.env before a public session."
  );
}

if (!ADMIN_SECRET) {
  console.warn(
    "WARNING: Set ADMIN_SECRET in multiplex_client/.env to unlock the admin page."
  );
}

function secretsMatch(candidate, expected) {
  const candidateBuffer = Buffer.from(String(candidate || ""));
  const expectedBuffer = Buffer.from(String(expected || ""));
  return (
    candidateBuffer.length === expectedBuffer.length &&
    timingSafeEqual(candidateBuffer, expectedBuffer)
  );
}

app.get("/", (_req, res) => res.send("Reveal Multiplex Server running."));
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});
app.post("/admin/authorize", (req, res) => {
  if (!ADMIN_SECRET) {
    return res.status(503).json({
      authorized: false,
      error: "Admin access is not configured."
    });
  }

  if (!secretsMatch(req.body?.secret, ADMIN_SECRET)) {
    return res.status(401).json({
      authorized: false,
      error: "Invalid admin credentials."
    });
  }

  return res.json({ authorized: true });
});

io.on("connection", (socket) => {
  // A client declares the room (talk id) right away
  const { room } = socket.handshake.query || {};
  if (room) {
    socket.join(room);
    const currentState = roomStates.get(room);
    if (currentState) socket.emit("slidechanged", currentState);
  }

  // Master emits slide changes with a secret; server relays to room
  socket.on("slidechanged", (payload = {}) => {
    const { key, room, h, v, f } = payload;
    if (key !== MASTER_SECRET || !room) return;
    const state = { h, v, f };
    roomStates.set(room, state);
    socket.to(room).emit("slidechanged", state);
  });
});

server.listen(PORT, () => {
  console.log(`Multiplex server on http://localhost:${PORT}`);
});
