<template>
  <section class="slide-container">
    <h2 class="slide-title">Da Teoria ao Produto: Checklist</h2>

    <div class="cards-container">
      <div class="card">
        <div class="icon" aria-hidden="true">🧭</div>
        <h3>Modelagem → Implementação</h3>
        <ul>
          <li class="fragment">Defina <b>hipótese</b>, variáveis, e métricas de sucesso.</li>
          <li class="fragment">Traduza o modelo em <b>operações computáveis</b> (norma, similaridade, índices).</li>
          <li class="fragment">Escolha <b>métricas</b> coerentes (cosine vs L2) e normalize onde fizer sentido.</li>
        </ul>
      </div>

      <div class="card">
        <div class="icon" aria-hidden="true">🚀</div>
        <h3>Produto → Impacto</h3>
        <ul>
          <li class="fragment"><b>Latência previsível</b> e custo dentro do orçamento.</li>
          <li class="fragment"><b>Observabilidade</b>: logs de consulta, scores e fontes.</li>
          <li class="fragment"><b>Versionamento</b> de dados/modelo/índice para auditoria.</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
defineOptions({ name: "SectionBridgeChecklist" });
</script>
