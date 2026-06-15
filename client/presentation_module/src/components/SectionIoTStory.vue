<template>
  <section
    class="content-slide story-anchor"
    style="--section-label: '03 / CASO 01'"
  >
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

      <article class="pivot-path response-path">
        <span class="flow-label">Resposta</span>
        <div>
          <strong>Raspberry Pi</strong>
          <i>→</i>
          <strong>Projeto IoT</strong>
        </div>
      </article>
    </div>

    <p class="story-takeaway">A arquitetura mudou. O objetivo continuou válido.</p>

    <aside class="notes">
      O diagrama já aparece completo: não avance o slide durante a história.
      Aponte para o plano inicial, a falha e a resposta enquanto narra. Conte sem
      pressa: objetivo do projeto, arquitetura original, descoberta dos módulos
      defeituosos, restrição de prazo e decisão de concentrar tudo no Raspberry
      Pi. Não transforme defeito em triunfo: houve custo e retrabalho. Feche com
      o valor de documentar evidência, decisão e consequência.
    </aside>
  </section>
</template>

<script setup>
defineOptions({ name: "SectionIoTStory" });
</script>
