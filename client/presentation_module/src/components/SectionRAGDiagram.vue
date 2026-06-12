<!-- RagDiagramSlide.vue -->
<template>
  <section class="image-slide">
    <section data-background-size="contain" data-background-image="matematica-aplicada-unicamp/static/rag.png"></section>
  </section>
</template>

<script setup>
defineOptions({ name: "SectionRAGDiagram" });
</script>

<style scoped>
.image-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.full-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain; /* mantém proporção */
}
</style>
