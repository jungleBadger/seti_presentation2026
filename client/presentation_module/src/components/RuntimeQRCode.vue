<template>
  <div ref="qrBox" class="runtime-qr">
    <span>Gerando QR Code…</span>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

defineOptions({ name: "RuntimeQRCode" });

const props = defineProps({
  url: {
    type: String,
    required: true
  }
});

const qrBox = ref(null);
let generation = 0;

watch(
  () => props.url,
  async (url) => {
    const currentGeneration = ++generation;

    try {
      const { toString: qrToString } = await import("qrcode");
      const svg = await qrToString(url, {
        type: "svg",
        margin: 1,
        width: 420,
        color: { dark: "#000000", light: "#FFFFFF" }
      });

      if (!qrBox.value || currentGeneration !== generation) return;
      qrBox.value.classList.remove("qr-error");
      qrBox.value.innerHTML = svg;

      const svgEl = qrBox.value.querySelector("svg");
      if (svgEl) {
        svgEl.removeAttribute("width");
        svgEl.removeAttribute("height");
        svgEl.setAttribute("preserveAspectRatio", "xMidYMid meet");
        svgEl.setAttribute("role", "img");
        svgEl.setAttribute("aria-label", `QR code para ${url}`);
      }
    } catch {
      if (!qrBox.value || currentGeneration !== generation) return;
      qrBox.value.classList.add("qr-error");
      qrBox.value.textContent = "Não foi possível gerar o QR Code.";
    }
  },
  { immediate: true, flush: "post" }
);
</script>

<style scoped>
.runtime-qr {
  display: grid;
  place-items: center;
  width: 100%;
  aspect-ratio: 1 / 1;
  box-sizing: border-box;
  overflow: hidden;
  background: #fff;
  border: 8px solid #fff;
  color: #111;
  font-weight: 700;
}

.runtime-qr.qr-error {
  padding: 1rem;
  text-align: center;
}

.runtime-qr :deep(svg) {
  display: block;
  width: 100%;
  height: 100%;
}

.runtime-qr :deep(svg rect),
.runtime-qr :deep(svg path) {
  shape-rendering: crispEdges;
}
</style>
