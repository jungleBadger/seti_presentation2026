<template>
  <section class="slide-container">
    <h2 class="slide-title">ÍNDICES VETORIAIS (ANN)</h2>

    <div class="cards-container">
      <!-- Card 1: Por que ANN -->
      <div class="card">
        <div class="icon" aria-hidden="true">⚡</div>
        <h3>Por que usar</h3>
        <ul>
          <li class="fragment" data-fragment-index="1">
            <b>Escala:</b> busca exata é O(N); ANN traz <b>latência estável</b> em milhões de vetores.
          </li>
          <li class="fragment" data-fragment-index="2">
            <b>Trade-off precisão × desempenho:</b> tune de <i>recall</i> vs. tempo/custo.
          </li>
          <li class="fragment" data-fragment-index="3">
            <b>Produção:</b> suporte a <i>top-k</i>, filtros, atualizações e particionamento.
          </li>
        </ul>
      </div>

      <!-- Card 2: Estruturas -->
      <div class="card">
        <div class="icon" aria-hidden="true">🧩</div>
        <h3>Estruturas principais</h3>
        <ul>
          <li class="fragment" data-fragment-index="4">
            <b>HNSW</b> (grafo hierárquico): ótimo <i>recall</i>, busca <b>logarítmica</b>, custo maior de memória.
          </li>
          <li class="fragment" data-fragment-index="5">
            <b>IVF</b> (coarse quantization): divide em <i>clusters</i> e busca só nos mais próximos.
          </li>
          <li class="fragment" data-fragment-index="6">
            <b>PQ/OPQ</b> (product quantization): <b>compressão</b> agressiva com perda controlada.
          </li>
          <li class="fragment" data-fragment-index="7">
            Combinações: <b>IVF-PQ</b>, <b>HNSW+PQ</b> para equilibrar memória/latência.
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
defineOptions({ name: "SectionVectorIndex" });
</script>
