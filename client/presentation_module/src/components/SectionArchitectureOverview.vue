<template>
  <section class="slide-container">
    <h2 class="slide-title">Arquitetura: Do Pedido à Resposta</h2>

    <div class="cards-container">
      <div class="card">
        <div class="icon" aria-hidden="true">🔌</div>
        <h3>Entrada</h3>
        <ul>
          <li class="fragment">API/Frontend → <b>consulta</b></li>
          <li class="fragment"><b>Normalização</b> e <b>embedding</b> da consulta</li>
          <li class="fragment">Filtros por <b>metadados</b> (tenant, idioma)</li>
        </ul>
      </div>

      <div class="card">
        <div class="icon" aria-hidden="true">🧱</div>
        <h3>Recuperação & Resposta</h3>
        <ul>
          <li class="fragment"><b>Índice vetorial</b> (top-k) + documentos</li>
          <li class="fragment"><b>Orquestração</b> → LLM com <b>contexto</b></li>
          <li class="fragment"><b>Traços</b>: passagens, scores, latência, custo</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
defineOptions({ name: "SectionArchitectureOverview" });
</script>
