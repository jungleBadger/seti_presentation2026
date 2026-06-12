<template>
  <section>
    <section class="content-slide">
      <p class="eyebrow">O plano na nossa cabeça</p>
      <h2>Uma linha reta</h2>

      <div
        class="path path-linear"
        aria-label="Escola, curso, estágio, emprego e sucesso"
      >
        <span>Escola</span>
        <i>→</i>
        <span>Curso</span>
        <i>→</i>
        <span>Estágio</span>
        <i>→</i>
        <span>Emprego</span>
        <i>→</i>
        <span>Sucesso</span>
      </div>

      <p class="fragment muted">Simples. Previsível. Controlável.</p>
    </section>

    <section class="content-slide reality-slide">
      <p class="eyebrow">O plano no mundo real</p>
      <h2>Uma rede de possibilidades</h2>

      <div class="reality-map" aria-hidden="true">
        <span class="node start">Você</span>
        <span class="node">oportunidade</span>
        <span class="node">erro</span>
        <span class="node">ajuda</span>
        <span class="node">mudança</span>
        <span class="node">tentativa</span>
        <span class="node">aprendizado</span>
        <span class="node end">próximo passo</span>
      </div>

      <p class="fragment lead">
        O mundo real não respeita a ordem do nosso desenho.
      </p>
    </section>

    <section class="statement-slide">
      <p class="eyebrow">Planejar não é</p>
      <h2>adivinhar o futuro corretamente.</h2>
      <p class="fragment lead">
        É tomar decisões explicáveis, testar hipóteses cedo e chegar ao próximo
        problema com opções.
      </p>
    </section>
  </section>
</template>

<script setup>
defineOptions({ name: "SectionReality" });
</script>
