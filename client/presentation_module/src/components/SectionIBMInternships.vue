<template>
  <section
    class="statement-slide opportunity-slide"
    style="--section-label: '09 / OPORTUNIDADES'"
  >
    <p class="eyebrow">Uma opção, não um roteiro</p>
    <h2>Programas de entrada na IBM</h2>

    <div class="internship-content">
      <RuntimeQRCode class="internship-qr" :url="INTERNSHIP_URL" />

      <div>
        <p class="lead">
          Consulte oportunidades abertas e leia os requisitos com atenção.
        </p>
        <a
          class="career-link"
          :href="INTERNSHIP_URL"
          target="_blank"
          rel="noopener noreferrer"
        >
          Estágios IBM no Brasil
        </a>
      </div>
    </div>

    <aside class="notes">
      Trate como recurso, não recrutamento. Diga que IBM é apenas uma das
      opções e que vagas mudam. Oriente a ler requisitos como uma lista de
      aprendizado, não como prova de que a pessoa precisa saber tudo.
    </aside>
  </section>
</template>

<script setup>
import RuntimeQRCode from "./RuntimeQRCode.vue";

defineOptions({ name: "SectionIBMInternships" });

const INTERNSHIP_URL =
  "https://www.ibm.com/br-pt/careers/search?field_keyword_18[0]=Internship&field_keyword_05[0]=Brazil";
</script>

<style scoped>
.internship-content {
  display: grid;
  width: 100%;
  grid-template-columns: minmax(220px, 340px) minmax(0, 1fr);
  align-items: center;
  gap: 3rem;
  margin-top: 1rem;
  text-align: left;
}

.internship-qr {
  width: 100%;
}

@media (max-width: 760px) {
  .internship-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .internship-qr {
    width: min(45vh, 100%);
  }
}
</style>
