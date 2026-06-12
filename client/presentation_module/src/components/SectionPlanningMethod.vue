<template>
  <section>
    <section class="content-slide">
      <p class="eyebrow">Um método simples</p>
      <h2>Planeje para descobrir cedo</h2>

      <div class="four-grid">
        <article class="mini-card fragment">
          <span>01</span>
          <h3>Objetivo</h3>
          <p>O que realmente precisa acontecer?</p>
        </article>
        <article class="mini-card fragment">
          <span>02</span>
          <h3>Hipóteses</h3>
          <p>O que estou supondo ser verdade?</p>
        </article>
        <article class="mini-card fragment">
          <span>03</span>
          <h3>Sinais</h3>
          <p>Que evidência mostraria que algo mudou?</p>
        </article>
        <article class="mini-card fragment">
          <span>04</span>
          <h3>Margem e resposta</h3>
          <p>Que tempo, ajuda ou alternativa ainda terei?</p>
        </article>
      </div>
    </section>

    <section class="statement-slide reason-slide">
      <p class="eyebrow">Uma decisão deve ser explicável</p>
      <h2>
        “Escolhi <span class="accent">X</span> porque acredito em
        <span class="accent">Y</span>.”
      </h2>
      <p class="fragment lead">Se Y mudar, talvez X também precise mudar.</p>
    </section>

    <section class="content-slide">
      <p class="eyebrow">Possibilidade ≠ boa decisão</p>
      <h2>Posso ou devo?</h2>

      <div class="decision-example">
        <p>
          Posso colocar todas as senhas direto no código porque é mais fácil?
        </p>
        <div class="decision-answer fragment">
          <strong class="yes">Posso.</strong>
          <strong class="no">Devo? Não.</strong>
        </div>
        <p class="fragment muted">
          Conseguir fazer não torna uma escolha responsável.
        </p>
      </div>
    </section>

    <section class="content-slide">
      <p class="eyebrow">O mesmo vale fora da tecnologia</p>
      <h2>Posso começar o trabalho na última noite?</h2>

      <div class="risk-strip">
        <span class="fragment">informação faltando</span>
        <span class="fragment">equipamento falhando</span>
        <span class="fragment">erro inesperado</span>
        <span class="fragment">sem tempo para pedir ajuda</span>
      </div>

      <p class="fragment lead">Pode funcionar. Mas não é um plano robusto.</p>
    </section>

    <section class="content-slide checklist-slide">
      <p class="eyebrow">Quando o plano mudar, pergunte</p>
      <ol class="big-checklist">
        <li class="fragment"><span>1</span> O objetivo ainda faz sentido?</li>
        <li class="fragment">
          <span>2</span> Qual hipótese caiu? Que evidência eu tenho?
        </li>
        <li class="fragment">
          <span>3</span> O que mudou no risco e no prazo?
        </li>
        <li class="fragment">
          <span>4</span> O que posso controlar ou influenciar?
        </li>
        <li class="fragment">
          <span>5</span> Qual é o menor próximo passo útil, e quem precisa
          saber?
        </li>
      </ol>
    </section>
  </section>
</template>

<script setup>
defineOptions({ name: "SectionPlanningMethod" });
</script>
