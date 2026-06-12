<template>
  <section class="content-slide story-anchor">
    <p class="eyebrow">Caso 01 · Projeto de graduação</p>
    <h2>O plano falhou. O objetivo não.</h2>

    <div class="pivot-diagram">
      <article class="pivot-path original-path">
        <span class="flow-label">Plano inicial</span>
        <div>
          <strong>Arduino</strong>
          <i>→</i>
          <strong>Módulos ESP</strong>
          <i>→</i>
          <strong>Projeto IoT</strong>
        </div>
      </article>

      <div class="pivot-marker" aria-label="O hardware falhou">
        <span>hardware</span>
        <strong>falhou</strong>
      </div>

      <article class="pivot-path response-path fragment">
        <span class="flow-label">Resposta</span>
        <div>
          <strong>Raspberry Pi</strong>
          <i>→</i>
          <strong>Projeto IoT</strong>
        </div>
      </article>
    </div>

    <p class="fragment story-takeaway">
      A arquitetura mudou. O objetivo continuou válido.
    </p>
  </section>
</template>

<script setup>
defineOptions({ name: "SectionIoTStory" });
</script>
