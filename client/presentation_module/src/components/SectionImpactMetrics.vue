<template>
  <section class="slide-container">
    <h2 class="slide-title">Métricas que Importam</h2>

    <div class="cards-container">
      <div class="card">
        <div class="icon" aria-hidden="true">🧪</div>
        <h3>Técnicas</h3>
        <ul>
          <li class="fragment"><b>Recall@k</b> e <b>MRR</b> no top-k</li>
          <li class="fragment"><b>Factualidade</b> com checagem por fonte</li>
          <li class="fragment"><b>Latência P95</b> e <b>erros</b> por tipo</li>
        </ul>
      </div>

      <div class="card">
        <div class="icon" aria-hidden="true">📊</div>
        <h3>Negócio</h3>
        <ul>
          <li class="fragment"><b>CSAT/NPS</b> do fluxo assistido por AI</li>
          <li class="fragment"><b>Conversão</b> / <b>retenção</b> / tempo de tarefa</li>
          <li class="fragment"><b>Custo por resposta</b> (tokens + infra)</li>
        </ul>
      </div>
    </div>

  </section>
</template>

<script setup>
defineOptions({ name: "SectionImpactMetrics" });
</script>
