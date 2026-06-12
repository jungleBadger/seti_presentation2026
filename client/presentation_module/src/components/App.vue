<!-- App.vue -->
<template>
  <div class="reveal" ref="mainSlides">
    <div class="slides">
      <SectionQRCode :url="AUDIENCE_URL" />
      <SectionOpening />
      <SectionReality />
      <SectionIoTStory />
      <SectionPlanningMethod />
      <SectionOwnershipStory />
      <SectionHumanDifference />
      <SectionCareer />
      <SectionClosing />
    </div>
  </div>

  <div v-if="SHOW_STATUS" class="status-badge" aria-live="polite">
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
import createDeck from "../configs/reveal";
import { store } from "../store/store.js";

/* Slides */
import SectionQRCode from "./SectionQRCode.vue";
import SectionOpening from "./SectionOpening.vue";
import SectionReality from "./SectionReality.vue";
import SectionIoTStory from "./SectionIoTStory.vue";
import SectionPlanningMethod from "./SectionPlanningMethod.vue";
import SectionOwnershipStory from "./SectionOwnershipStory.vue";
import SectionHumanDifference from "./SectionHumanDifference.vue";
import SectionCareer from "./SectionCareer.vue";
import SectionClosing from "./SectionClosing.vue";

defineOptions({ name: "JPFApp" });

/* Deck ref */
const mainSlides = ref(null);
let deck;

/* ───── Query + loader ───── */
function qp(name, def = "") {
  const u = new URL(window.location.href);
  return u.searchParams.get(name) ?? def;
}
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

/* ───── Optional multiplex synchronization ───── */
const SOCKET_ORIGIN = qp(
  "socket",
  import.meta.env.VITE_SOCKET_ORIGIN || ""
).replace(/\/$/, "");
const ROOM = qp("room", import.meta.env.VITE_ROOM || "planos-faliveis");
const IS_MASTER = qp("master", "") === "1";
const MASTER_KEY = qp("key", "");
const SHOW_STATUS = IS_MASTER || qp("status", "") === "1";

function createAudienceUrl() {
  const configuredUrl = import.meta.env.VITE_PUBLIC_URL;
  const url = new URL(configuredUrl || window.location.href);
  url.searchParams.set("room", ROOM);
  url.searchParams.delete("master");
  url.searchParams.delete("key");
  url.searchParams.delete("status");
  url.searchParams.delete("socket");
  return url.toString();
}

const AUDIENCE_URL = createAudienceUrl();
let socket = null;

/* Badge reactive state */
const isSocketConnected = ref(false);
const isGamepadConnected = ref(false);

/* ───── Reveal handlers ───── */
function handleSlideChange(ev) {
  store.pageX = ev?.indexh ?? 0;
  store.pageY = ev?.indexv ?? 0;

  if (IS_MASTER && socket) {
    socket.emit("slidechanged", {
      key: MASTER_KEY,
      room: ROOM,
      h: ev?.indexh ?? 0,
      v: ev?.indexv ?? 0,
      f: ev?.indexf ?? 0
    });
  }
}
function handleFragmentShown(ev) {
  const el = ev?.fragment;
  if (el) {
    el.classList.remove("jpf-hidden");
    el.classList.add("jpf-active");
  }
  store.activeFragment = el ?? null;
  if (IS_MASTER && socket)
    socket.emit("fragmentshown", { key: MASTER_KEY, room: ROOM });
}
function handleFragmentHidden(ev) {
  const el = ev?.fragment;
  if (el) {
    el.classList.remove("jpf-active");
    el.classList.add("jpf-hidden");
  }
  store.activeFragment = null;
  if (IS_MASTER && socket)
    socket.emit("fragmenthidden", { key: MASTER_KEY, room: ROOM });
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
  // Reveal
  deck = createDeck(mainSlides.value);
  deck.on("slidechanged", handleSlideChange);
  deck.on("fragmentshown", handleFragmentShown);
  deck.on("fragmenthidden", handleFragmentHidden);

  // Theme toggle
  const THEMES = ["projector-theme", "light-theme", ""];
  let themeIndex = 0;
  const onKey = (e) => {
    if (e.key.toLowerCase() !== "t") return;
    document.documentElement.classList.remove("projector-theme", "light-theme");
    themeIndex = (themeIndex + 1) % THEMES.length;
    if (THEMES[themeIndex])
      document.documentElement.classList.add(THEMES[themeIndex]);
  };
  window.addEventListener("keydown", onKey);

  await deck.initialize();

  if (SOCKET_ORIGIN) {
    try {
      await loadScript(`${SOCKET_ORIGIN}/socket.io/socket.io.js`);
      socket = window.io(SOCKET_ORIGIN, {
        path: "/socket.io",
        query: { room: ROOM }
      });
      socket.on("connect", () => {
        isSocketConnected.value = true;
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
        socket.on("fragmentshown", () => deck.next());
        socket.on("fragmenthidden", () => deck.prev());
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
    window.removeEventListener("keydown", onKey);
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

<style scoped lang="scss">
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
