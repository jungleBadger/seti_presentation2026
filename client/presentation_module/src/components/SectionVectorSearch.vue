<template>
  <section class="slide-container">
    <h2 class="slide-title">BUSCA VETORIAL + RAG</h2>

    <div class="cards-container">
      <!-- Card 1 -->
      <div class="card" data-fragment-index="1">
        <div class="icon" aria-hidden="true">🧭</div>
        <h3>Como funciona</h3>
        <ul>
          <li data-fragment-index="2">
            Texto/consulta → <b>embeddings</b> (vetores em ℝⁿ)
          </li>
          <li class="fragment" data-fragment-index="3">
            <b>Similaridade (cosseno)</b> recupera os trechos mais próximos
          </li>
          <li class="fragment" data-fragment-index="4">
            <b>LLM + contexto recuperado</b> → resposta com referências
          </li>
        </ul>
      </div>

      <!-- Card 2 -->
      <div class="card" data-fragment-index="5">
        <div class="icon" aria-hidden="true">📈</div>
        <h3>Por que importa</h3>
        <ul>
          <li class="fragment" data-fragment-index="6">
            <b>Qualidade:</b> menos alucinação e resposta com fontes
          </li>
          <li class="fragment" data-fragment-index="7">
            <b>Latência:</b> índice vetorial (ANN) otimizado para top-k
          </li>
          <li class="fragment" data-fragment-index="8">
            <b>Custo:</b> menos tokens ao enviar só os trechos relevantes
          </li>
          <li class="fragment" data-fragment-index="9">
            <b>Governança:</b> trilha de auditoria do conteúdo usado
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
defineOptions({ name: "SectionVectorSearch" });
</script>
