<template>
  <section class="slide-container content-slide qr-slide">
    <p class="eyebrow">Open talk · apresentação sincronizada</p>
    <h2>Abra no seu celular</h2>

    <div class="qr-wrap">
      <div ref="qrBox" class="qr-box">
        <div class="qr-fallback">Gerando QR Code…</div>
      </div>

      <div class="qr-caption">
        <p class="qr-kicker">Acompanhe os slides no seu dispositivo.</p>
        <p class="qr-detail">Leia o QR Code ou acesse:</p>
        <p class="qr-url">
          <a :href="url" target="_blank" rel="noopener noreferrer">
            {{ displayUrl }}
          </a>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { toString as qrToString } from "qrcode";

defineOptions({ name: "SectionQRCode" });

const props = defineProps({
  url: {
    type: String,
    required: true
  }
});

const qrBox = ref(null);
const displayUrl = computed(() => props.url.replace(/^https?:\/\//, ""));

onMounted(async () => {
  const svg = await qrToString(props.url, {
    type: "svg",
    margin: 1,
    width: 420,
    color: { dark: "#000000", light: "#FFFFFF" }
  });

  if (!qrBox.value) return;
  qrBox.value.innerHTML = svg;

  const svgEl = qrBox.value.querySelector("svg");
  if (svgEl) {
    // Deixe o CSS controlar o tamanho
    svgEl.removeAttribute("width");
    svgEl.removeAttribute("height");
    svgEl.setAttribute("preserveAspectRatio", "xMidYMid meet");
    svgEl.setAttribute("role", "img");
    svgEl.setAttribute("aria-label", `QR code para ${displayUrl.value}`);
  }
});
</script>

<style scoped>
.qr-slide {
  text-align: left;
}

.qr-wrap {
  display: grid;
  width: 100%;
  grid-template-columns: minmax(240px, 420px) minmax(0, 1fr);
  align-items: center;
  gap: 3rem;
  margin-top: 1rem;
}

.qr-box {
  display: grid;
  place-items: center;
  width: 100%;
  aspect-ratio: 1 / 1;
  background: #fff;
  border: 8px solid #fff;
  overflow: hidden;
}

:deep(.qr-box svg) {
  width: 100%;
  height: 100%;
  display: block;
}

:deep(.qr-box svg rect),
:deep(.qr-box svg path) {
  shape-rendering: crispEdges;
}

.qr-fallback {
  color: #111;
  font-weight: 700;
}

.qr-caption {
  max-width: 28rem;
  padding-top: 1rem;
  border-top: 4px solid var(--interactive);
  text-align: left;
}

.qr-caption p {
  margin: 0 0 0.75rem;
  color: var(--ink);
}

.qr-caption .qr-kicker {
  font-size: 0.62em;
  line-height: 1.3;
}

.qr-caption .qr-detail {
  color: var(--muted);
  font-size: 0.38em;
}

.qr-caption a {
  font-family: var(--r-code-font);
  font-size: 0.42em;
  font-weight: 500;
  word-break: break-all;
}

@media (max-width: 760px) {
  .qr-wrap {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .qr-box {
    width: min(55vh, 100%);
  }
}
</style>
