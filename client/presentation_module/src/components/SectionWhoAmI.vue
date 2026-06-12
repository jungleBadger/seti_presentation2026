<template>


  <section>

    <section data-background-size="cover" data-background-image="/matematica-aplicada-unicamp/static/pixelart8.webp" data-background-opacity="0.05" data-auto-animate>
      <h2><span style="font-size: 1em; font-weight: bold; color: #00FFFF; text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);">Da Teoria ao Impacto:</span> <span style="font-size: 1.1em; color: #FFFFFF; text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5); font-weight: normal">Como a matemática move arquiteturas inteligentes</span></h2>
    </section>

    <section data-background-size="cover" data-background-image="/matematica-aplicada-unicamp/static/pixelart8.webp" data-background-opacity="0.12" data-auto-animate>
      <h2><span style="font-size: 1em; font-weight: bold; color: #00FFFF; text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);">Da Teoria ao Impacto:</span> <span style="font-size: 1.1em; color: #FFFFFF; text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5); font-weight: normal">Como a matemática move arquiteturas inteligentes</span></h2>
      <h3 style="font-size: 1.2em; color: #FFD700; font-weight: bold; text-align: center; text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5); margin-top: 30px;">
        Por Daniel Abrão</h3>
    </section>



    <section data-background-size="cover" data-background-image="/matematica-aplicada-unicamp/static/pic3.jpg" data-background-opacity="0.25">
      <h1 class="header-title">
        Companies
      </h1>
      <p class="fragment">
        IBM - 2015 ~ present
      </p>
      <p class="fragment">
        Udacity - 2017 ~ present
      </p>
    </section>



    <section data-background-size="cover" data-background-image="/matematica-aplicada-unicamp/static/pic1.jpg" data-background-opacity="0.25">
      <h1 class="header-title">
        Skills
      </h1>
      <p class="fragment">
        Web development
      </p>
      <p class="fragment">
        Leadership
      </p>
      <p class="fragment">
        Architecture
      </p>
    </section>



  </section>

</template>

<script setup>
defineOptions({
  name: "SectionWhoAmI"
});
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.who-am-i-content-box {
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  text-align: center;
  background-color: rgba(40, 44, 52, 0.8);
  color: white;

  h1 {
    font-size: 3em;
    margin-bottom: 0.5em;
  }

  & > .tech-card-wrapper {
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 4em;

    a {
      text-decoration: none;
    }

    .tech-card {

      h2 {
        margin-top: 1em;
        font-size: 2em;
        color: inherit;
      }

      &.python {
        --c: #306998;
      }

      &.node {
        --c: #83CD29;
      }

      &.ibm {
        --c: #1F70C1;
      }

      &.udacity {
        --c: #02b3e4;
      }

      & {
        --b: 10px;
        --g: 5px;
        padding: calc(var(--g) + var(--b));
        --_g: #0000 25%, var(--c) 0;
        background: conic-gradient(from 180deg at top var(--b) right var(--b), var(--_g)) var(--_i, 200%) 0 / 200% var(--_i, var(--b)) no-repeat, conic-gradient(at bottom var(--b) left var(--b), var(--_g)) 0 var(--_i, 200%) / var(--_i, var(--b)) 200% no-repeat;
        transition: .3s, background-position .3s .3s;
        cursor: pointer;
        margin: 8px;
      }

      &:hover {
        --_i: 100%;
        transition: .3s, background-size .3s .3s;
      }

      & > .icon-container {
        width: 6em;
        height: 6em;
        margin: 0 auto;
      }
    }

  }


}




</style>
