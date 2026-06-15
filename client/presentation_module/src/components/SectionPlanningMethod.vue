<template>
  <section style="--section-label: '04 / MÉTODO'">
    <section class="content-slide">
      <p class="eyebrow">Um método simples</p>
      <h2>Planeje para descobrir cedo</h2>

      <div class="four-grid">
        <article class="mini-card">
          <span>01</span>
          <h3>Objetivo</h3>
          <p>O que realmente precisa acontecer?</p>
        </article>
        <article class="mini-card">
          <span>02</span>
          <h3>Hipóteses</h3>
          <p>O que estou supondo ser verdade?</p>
        </article>
        <article class="mini-card">
          <span>03</span>
          <h3>Sinais</h3>
          <p>Que evidência mostraria que algo mudou?</p>
        </article>
        <article class="mini-card">
          <span>04</span>
          <h3>Margem e resposta</h3>
          <p>Que tempo, ajuda ou alternativa ainda terei?</p>
        </article>
      </div>

      <aside class="notes">
        Apresente as quatro perguntas como um ciclo, não burocracia. Aplique
        cada uma ao caso IoT em uma frase. Frase-memória: objetivo, hipótese,
        sinal, opção.
      </aside>
    </section>

    <section class="statement-slide reason-slide">
      <p class="eyebrow">Uma decisão deve ser explicável</p>
      <h2>
        “Escolhi <span class="accent">X</span> porque acredito em
        <span class="accent">Y</span>.”
      </h2>
      <p class="lead">Se Y mudar, talvez X também precise mudar.</p>

      <aside class="notes">
        Dê um exemplo simples: “Escolhi ônibus porque acredito que chega antes
        da prova”. Se o horário muda, revisar a escolha é coerência, não
        fracasso. Decisões sem motivo explícito viram regras difíceis de
        questionar.
      </aside>
    </section>

    <section class="content-slide">
      <p class="eyebrow">Possibilidade ≠ boa decisão</p>
      <h2>Posso ou devo?</h2>

      <div class="decision-example">
        <p>
          Posso entregar uma solução feita com IA que eu não consigo explicar?
        </p>
        <div class="fragment">
          <div class="decision-answer">
            <strong class="yes">Posso.</strong>
            <strong class="no">Devo? Não.</strong>
          </div>
          <p class="muted">
            Usar uma ferramenta não transfere a responsabilidade.
          </p>
        </div>
      </div>

      <aside class="notes">
        Este é o único fragment deliberado do deck. Faça a turma responder
        primeiro: “pode?” e depois “deve?”. Só então avance uma vez para mostrar
        resposta e conclusão juntas. Não condene o uso de IA. O ponto é que
        entregar algo exige conseguir explicar a intenção, verificar o
        resultado e responder pelas consequências.
      </aside>
    </section>

    <section class="statement-slide">
      <p class="eyebrow">Questione a linguagem</p>
      <h2>“Não devemos” não é “não podemos”.</h2>
      <p class="lead">
        Separe impossibilidade de regra, preferência, custo ou limite atual.
      </p>
      <h2 class="accent">O que impede, e por quê?</h2>

      <aside class="notes">
        Conecte ao exemplo anterior: gerar uma solução é possível, mas isso não
        comprova entendimento ou qualidade. Questione com respeito, buscando a
        razão da regra. Não defenda ignorar segurança, lei ou experiência;
        defenda entender limites para decidir melhor.
      </aside>
    </section>

    <section class="content-slide">
      <p class="eyebrow">O mesmo vale fora da tecnologia</p>
      <h2>Posso começar o trabalho na última noite?</h2>

      <div class="risk-strip">
        <span>informação faltando</span>
        <span>equipamento falhando</span>
        <span>erro inesperado</span>
        <span>sem tempo para pedir ajuda</span>
      </div>

      <p class="lead">Pode funcionar. Mas não é um plano robusto.</p>

      <aside class="notes">
        Volte ao cotidiano da turma. O problema não é moralizar a última noite;
        é mostrar que esse plano elimina margem. Pergunte: “qual desses riscos
        já aconteceu com vocês?”.
      </aside>
    </section>

    <section class="content-slide checklist-slide">
      <p class="eyebrow">Quando o plano mudar, pergunte</p>
      <ol class="big-checklist">
        <li><span>1</span> O objetivo ainda faz sentido?</li>
        <li>
          <span>2</span> Qual hipótese caiu? Que evidência eu tenho?
        </li>
        <li>
          <span>3</span> O que mudou no risco e no prazo?
        </li>
        <li>
          <span>4</span> O que posso controlar ou influenciar?
        </li>
        <li>
          <span>5</span> Qual é o menor próximo passo útil, e quem precisa
          saber?
        </li>
      </ol>

      <aside class="notes">
        Não leia a lista inteira. Escolha dois pontos e aplique a um exemplo.
        Destaque “quem precisa saber”: adaptar sem comunicar pode criar outra
        falha. Transição: nem toda mudança é técnica ou está sob seu controle.
      </aside>
    </section>
  </section>
</template>

<script setup>
defineOptions({ name: "SectionPlanningMethod" });
</script>
