<!-- App.vue -->
<template>
  <SessionAdmin
    v-if="ADMIN_MODE"
    :default-room="ROOM"
    :default-socket-origin="SOCKET_ORIGIN"
  />

  <div v-else class="reveal" ref="mainSlides">
    <div class="slides">
      <SectionQRCode v-if="AUDIENCE_SYNC_ENABLED" :url="AUDIENCE_URL" />
      <SectionOpening />
      <SectionReality />
      <SectionIoTStory />
      <SectionPlanningMethod />
      <SectionOwnershipStory />
      <SectionHumanDifference />
      <SectionCareer />
      <SectionClosing />
      <SectionIBMInternships />
    </div>
  </div>

  <div
    v-if="!ADMIN_MODE && SHOW_STATUS"
    class="status-badge"
    aria-live="polite"
  >
    <div class="row">
      <span class="tag">{{ IS_MASTER ? "MASTER" : "AUDIENCE" }}</span>
      <span class="sep">•</span>
      <span class="room" title="Room">{{ ROOM }}</span>
    </div>
    <div class="row">
      <span class="dot" :class="isSocketConnected ? 'ok' : 'err'"></span>
      <span>Socket</span>
      <span class="sep">/</span>
      <span class="dot" :class="isGamepadConnected ? 'ok' : 'warn'"></span>
      <span>Gamepad</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { io } from "socket.io-client";
import createDeck from "../configs/reveal";

/* Slides */
import SessionAdmin from "./SessionAdmin.vue";
import SectionQRCode from "./SectionQRCode.vue";
import SectionOpening from "./SectionOpening.vue";
import SectionReality from "./SectionReality.vue";
import SectionIoTStory from "./SectionIoTStory.vue";
import SectionPlanningMethod from "./SectionPlanningMethod.vue";
import SectionOwnershipStory from "./SectionOwnershipStory.vue";
import SectionHumanDifference from "./SectionHumanDifference.vue";
import SectionCareer from "./SectionCareer.vue";
import SectionIBMInternships from "./SectionIBMInternships.vue";
import SectionClosing from "./SectionClosing.vue";

defineOptions({ name: "JPFApp" });

/* Deck ref */
const mainSlides = ref(null);
let deck;
const MASTER_KEY_STORAGE = "planos-faliveis:master-key";

/* ───── Query + loader ───── */
function qp(name, def = "") {
  const u = new URL(window.location.href);
  return u.searchParams.get(name) ?? def;
}

/* ───── Optional multiplex synchronization ───── */
const SOCKET_ORIGIN = qp(
  "socket",
  import.meta.env.VITE_SOCKET_ORIGIN || ""
).replace(/\/$/, "");
const ROOM = qp("room", import.meta.env.VITE_ROOM || "planos-faliveis");
const ADMIN_MODE = qp("admin", "") === "1";
const IS_MASTER = qp("master", "") === "1";
const THEME_NAMES = ["projector", "dark", "light"];
const QUERY_THEME = qp("theme", "dark");
const THEME = THEME_NAMES.includes(QUERY_THEME) ? QUERY_THEME : "dark";
const QUERY_MASTER_KEY = qp("key", "");
if (QUERY_MASTER_KEY) {
  window.sessionStorage.setItem(MASTER_KEY_STORAGE, QUERY_MASTER_KEY);
  const cleanUrl = new URL(window.location.href);
  cleanUrl.searchParams.delete("key");
  window.history.replaceState({}, "", cleanUrl);
}
const MASTER_KEY =
  QUERY_MASTER_KEY || window.sessionStorage.getItem(MASTER_KEY_STORAGE) || "";
const SHOW_STATUS = IS_MASTER || qp("status", "") === "1";
const AUDIENCE_SYNC_ENABLED = Boolean(SOCKET_ORIGIN);

function applyTheme(theme) {
  document.documentElement.classList.remove("projector-theme", "light-theme");
  if (theme === "projector")
    document.documentElement.classList.add("projector-theme");
  if (theme === "light") document.documentElement.classList.add("light-theme");
}

if (!ADMIN_MODE) applyTheme(THEME);

function createAudienceUrl() {
  const configuredUrl = import.meta.env.VITE_PUBLIC_URL;
  const url = new URL(configuredUrl || window.location.href);
  url.searchParams.set("room", ROOM);
  url.searchParams.delete("master");
  url.searchParams.delete("key");
  url.searchParams.delete("status");
  url.searchParams.delete("admin");
  url.searchParams.set("theme", THEME);
  if (SOCKET_ORIGIN) url.searchParams.set("socket", SOCKET_ORIGIN);
  else url.searchParams.delete("socket");
  return url.toString();
}

const AUDIENCE_URL = AUDIENCE_SYNC_ENABLED ? createAudienceUrl() : "";
let socket = null;

/* Badge reactive state */
const isSocketConnected = ref(false);
const isGamepadConnected = ref(false);

/* ───── Reveal handlers ───── */
function emitDeckState() {
  if (!IS_MASTER || !socket || !deck) return;
  const { h = 0, v = 0, f = 0 } = deck.getIndices();
  socket.emit("slidechanged", { key: MASTER_KEY, room: ROOM, h, v, f });
}

function handleSlideChange() {
  emitDeckState();
}
function handleFragmentShown() {
  emitDeckState();
}
function handleFragmentHidden() {
  emitDeckState();
}

/* ───── Gamepad support ───── */
let gamepadRAF = null;
let lastButtons = [];
let lastAxes = [0, 0];
const DEADZONE = 0.35;
const REPEAT_COOLDOWN = 180;
let lastStickMoveAt = 0;

function pressedOnce(idx, gp) {
  const isPressed = !!gp?.buttons?.[idx]?.pressed;
  const wasPressed = !!lastButtons[idx];
  lastButtons[idx] = isPressed;
  return isPressed && !wasPressed;
}
function axisValue(val) {
  return Math.abs(val) > DEADZONE ? Math.sign(val) : 0;
}

function handleGamepad(gp) {
  if (!gp || !deck) return;
  // Set badge state (connected when any pad present)
  isGamepadConnected.value = true;

  // Face buttons: 0=Cross,1=Circle,2=Square,3=Triangle
  if (pressedOnce(3, gp)) deck.up();
  if (pressedOnce(1, gp)) deck.right();
  if (pressedOnce(0, gp)) deck.down();
  if (pressedOnce(2, gp)) deck.left();

  // D-pad: 12=Up, 13=Down, 14=Left, 15=Right
  if (pressedOnce(12, gp)) deck.up();
  if (pressedOnce(13, gp)) deck.down();
  if (pressedOnce(14, gp)) deck.left();
  if (pressedOnce(15, gp)) deck.right();

  // Left stick (axes[0]=x, axes[1]=y) with cooldown
  const axX = axisValue(gp.axes?.[0] ?? 0);
  const axY = axisValue(gp.axes?.[1] ?? 0);
  const now = performance.now();
  const changed = axX !== lastAxes[0] || axY !== lastAxes[1];
  if (changed && now - lastStickMoveAt > REPEAT_COOLDOWN) {
    if (axY < 0) deck.up();
    if (axY > 0) deck.down();
    if (axX < 0) deck.left();
    if (axX > 0) deck.right();
    lastStickMoveAt = now;
  }
  lastAxes[0] = axX;
  lastAxes[1] = axY;
}

function gamepadLoop() {
  const pads = navigator.getGamepads ? navigator.getGamepads() : [];
  const gp = pads && Array.from(pads).find(Boolean);
  if (gp) handleGamepad(gp);
  else isGamepadConnected.value = false; // none detected in this frame
  gamepadRAF = window.requestAnimationFrame(gamepadLoop);
}
function startGamepad() {
  lastButtons = new Array(32).fill(false);
  lastAxes = [0, 0];
  if (gamepadRAF == null)
    gamepadRAF = window.requestAnimationFrame(gamepadLoop);
}
function stopGamepad() {
  if (gamepadRAF != null) {
    window.cancelAnimationFrame(gamepadRAF);
    gamepadRAF = null;
  }
  isGamepadConnected.value = false;
}

/* ───── lifecycle ───── */
onMounted(async () => {
  if (ADMIN_MODE) return;

  // Reveal
  deck = createDeck(mainSlides.value);
  deck.on("slidechanged", handleSlideChange);
  deck.on("fragmentshown", handleFragmentShown);
  deck.on("fragmenthidden", handleFragmentHidden);

  let themeIndex = THEME_NAMES.indexOf(THEME);
  deck.addKeyBinding(
    {
      keyCode: 84,
      key: "T",
      description: "Alternar tema da apresentação"
    },
    () => {
    themeIndex = (themeIndex + 1) % THEME_NAMES.length;
    applyTheme(THEME_NAMES[themeIndex]);
    }
  );

  await deck.initialize();

  if (SOCKET_ORIGIN) {
    try {
      socket = io(SOCKET_ORIGIN, {
        path: "/socket.io",
        query: { room: ROOM },
        transports: ["websocket", "polling"]
      });
      socket.on("connect", () => {
        isSocketConnected.value = true;
        emitDeckState();
      });
      socket.on("disconnect", () => {
        isSocketConnected.value = false;
      });
      socket.on("connect_error", () => {
        isSocketConnected.value = false;
      });

      if (!IS_MASTER) {
        socket.on("slidechanged", ({ h = 0, v = 0, f = 0 } = {}) =>
          deck.slide(h, v, f)
        );
      }
    } catch (error) {
      console.warn("Presentation synchronization is unavailable.", error);
    }
  }

  // Gamepad listeners
  const onGamepadConnected = () => startGamepad();
  const onGamepadDisconnected = () => stopGamepad();
  window.addEventListener("gamepadconnected", onGamepadConnected);
  window.addEventListener("gamepaddisconnected", onGamepadDisconnected);
  if ([...(navigator.getGamepads?.() || [])].some(Boolean)) startGamepad();

  // Cleanup
  deck.on("destroy", () => {
    window.removeEventListener("gamepadconnected", onGamepadConnected);
    window.removeEventListener("gamepaddisconnected", onGamepadDisconnected);
    try {
      socket && socket.disconnect();
    } catch {}
    stopGamepad();
  });
});

onBeforeUnmount(() => {
  stopGamepad();
  try {
    socket && socket.disconnect();
  } catch {}
  if (!deck) return;
  deck.off("slidechanged", handleSlideChange);
  deck.off("fragmentshown", handleFragmentShown);
  deck.off("fragmenthidden", handleFragmentHidden);
  deck.destroy();
});
</script>

<style scoped>
.status-badge {
  position: fixed;
  top: 12px;
  right: 12px;
  z-index: 9999;
  background: var(--panel, #262626);
  color: var(--ink, #fff);
  border: var(--panel-border, 1px solid rgba(255, 255, 255, 0.12));
  border-radius: 0;
  box-shadow: none;
  padding: 0.6rem 0.8rem;
  font-family: var(--r-code-font, monospace);
  font-size: clamp(12px, 1.6vw, 14px);
  line-height: 1.2;
}
.status-badge .row {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  white-space: nowrap;
}
.status-badge .row + .row {
  margin-top: 0.25rem;
  opacity: 0.9;
}
.status-badge .tag {
  font-weight: 800;
  letter-spacing: 0.02em;
}
.status-badge .room {
  max-width: 22ch;
  overflow: hidden;
  text-overflow: ellipsis;
}
.status-badge .sep {
  opacity: 0.6;
}
.status-badge .dot {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 999px;
  display: inline-block;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.15) inset;
}
.status-badge .dot.ok {
  background: #10b981;
} /* green */
.status-badge .dot.err {
  background: #ef4444;
} /* red */
.status-badge .dot.warn {
  background: #9ca3af;
} /* gray */
</style>
