<!-- SectionEmbeddingBestPractices.vue -->
<template>
  <section class="slide-container">
    <h2 class="slide-title">BOAS PRÁTICAS DE EMBEDDINGS</h2>

    <div class="cards-container">
      <!-- Card 1: Modelagem & Qualidade -->
      <div class="card fragment" data-fragment-index="1">
        <div class="icon" aria-hidden="true">🧠</div>
        <h3>Modelagem & Qualidade</h3>
        <ul>
          <li class="fragment" data-fragment-index="2">
            <b>Normalização L2</b> antes de buscar (estabiliza <i>cosine</i> e ranking).
          </li>
          <li class="fragment" data-fragment-index="3">
            <b>Escolha da métrica:</b> Cosine p/ vetores normalizados; L2 p/ espaços euclidianos; <i>dot</i> se calibrado.
          </li>
          <li class="fragment" data-fragment-index="4">
            <b>Dimensão</b>: evite extremos — mais dim ≠ melhor; teste <i>recall@k</i> × latência × memória.
          </li>
          <li class="fragment" data-fragment-index="5">
            <b>Domínio</b>: embeddings específicos (código, legal, saúde) superam modelos genéricos.
          </li>
          <li class="fragment" data-fragment-index="6">
            <b>Chunking</b>: janelas ~200–500 tokens com <i>overlap</i> 10–20% reduzem cortes sem inflar índice.
          </li>
        </ul>
      </div>

      <!-- Card 2: Operação & Governança -->
      <div class="card fragment" data-fragment-index="7">
        <div class="icon" aria-hidden="true">🛠️</div>
        <h3>Operação & Governança</h3>
        <ul>
          <li class="fragment" data-fragment-index="8">
            <b>Versionamento</b> de embeddings/índice; <i>backfill</i> offline; <i>dual-run</i> antes do corte.
          </li>
          <li class="fragment" data-fragment-index="9">
            <b>Filtro por metadados</b> (tenant, idioma, data) antes do <i>top-k</i> melhora precisão.
          </li>
          <li class="fragment" data-fragment-index="10">
            <b>Avaliação contínua</b>: recall@k, MRR/nDCG, taxa de clique; dashboards com <i>golden sets</i>.
          </li>
          <li class="fragment" data-fragment-index="11">
            <b>Latência previsível</b>: ANN (HNSW/IVF-PQ), cache de consultas e limites de tamanho do contexto.
          </li>
          <li class="fragment" data-fragment-index="12">
            <b>Traçabilidade</b>: log das passagens usadas no RAG (fonte, score, versão do índice).
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
defineOptions({ name: "SectionEmbeddingBestPractices" });
</script>
