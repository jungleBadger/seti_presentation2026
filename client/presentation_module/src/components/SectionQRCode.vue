<template>
  <section
    class="slide-container content-slide qr-slide"
    style="--section-label: 'ACESSO / AO VIVO'"
  >
    <p class="eyebrow">Open talk · apresentação sincronizada</p>
    <h2>Abra no seu celular</h2>

    <div class="qr-wrap">
      <RuntimeQRCode class="qr-box" :url="url" />

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

    <aside class="notes">
      Use esta tela enquanto as pessoas chegam. Explique que acompanhar pelo
      celular é opcional. Confirme que a apresentação local continua funcionando
      mesmo se a sincronização falhar.
    </aside>
  </section>
</template>

<script setup>
import { computed } from "vue";
import RuntimeQRCode from "./RuntimeQRCode.vue";

defineOptions({ name: "SectionQRCode" });

const props = defineProps({
  url: {
    type: String,
    required: true
  }
});

const displayUrl = computed(() => props.url.replace(/^https?:\/\//, ""));
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
  width: 100%;
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
