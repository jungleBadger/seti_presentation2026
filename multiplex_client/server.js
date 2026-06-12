import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
    path: "/socket.io" // default; keep it so the client URL is .../socket.io/socket.io.js
});

const PORT = process.env.PORT || 3005;
const MASTER_SECRET = process.env.MASTER_SECRET || "change-me-please";

// Optional: tiny health route
app.get("/", (_req, res) => res.send("Reveal Multiplex Server running."));

io.on("connection", (socket) => {
    // A client declares the room (talk id) right away
    const { room } = socket.handshake.query || {};
    if (room) {
        socket.join(room);
        // console.log(`Client ${socket.id} joined room ${room}`);
    }

    // Master emits slide changes with a secret; server relays to room
    socket.on("slidechanged", (payload = {}) => {
        const { key, room, h, v, f } = payload;
        if (key !== MASTER_SECRET || !room) return;
        io.to(room).emit("slidechanged", { h, v, f });
    });

    socket.on("fragmentshown", (payload = {}) => {
        const { key, room } = payload;
        if (key !== MASTER_SECRET || !room) return;
        io.to(room).emit("fragmentshown");
    });

    socket.on("fragmenthidden", (payload = {}) => {
        const { key, room } = payload;
        if (key !== MASTER_SECRET || !room) return;
        io.to(room).emit("fragmenthidden");
    });
});

server.listen(PORT, () => {
    console.log(`Multiplex server on http://localhost:${PORT}`);
});
