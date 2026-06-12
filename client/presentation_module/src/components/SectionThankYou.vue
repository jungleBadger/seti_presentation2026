<template>

  <section>
    <section
        data-background-video="matematica-aplicada-unicamp/static/flame-bg-frame.mp4">
      Thank you
    </section>

    <section data-background-size="contain" data-background-image="matematica-aplicada-unicamp/static/pic6.jpg"></section>

    <section>
      And remember...
    </section>

    <section>
      <blockquote class="quote-slide">
        It is better to know how to ask any question<br>
        than expecting to know all the answers
      </blockquote>
    </section>
  </section>
</template>

<script setup>
defineOptions({
  name: "SectionThankYou"
});
</script>

<style scoped lang="scss">
:root {
  --ibm-blue: #052f5f;
  --text-on-dark: #ffffff;
}

/* 1) Thank you */
.thankyou {
  color: var(--text-on-dark);
  text-shadow: 2px 2px 10px rgba(0,0,0,.5);
  font-weight: 800;
  font-size: clamp(48px, 10vw, 110px);
  letter-spacing: .02em;
}

/* Subtle dark overlay to improve contrast on video */
.video-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, rgba(0,0,0,.25), rgba(0,0,0,.55));
  pointer-events: none;
}

/* 3) Bridge */
.bridge {
  color: var(--ibm-blue);
  font-weight: 800;
  text-shadow: 0 2px 8px rgba(0,0,0,.15);
}

/* 4) Quote */
.quote-slide {
  width: min(900px, 90%);
  margin: 0 auto;
  padding: 20px 28px;
  text-align: center;
  color: var(--text-on-dark);
  font-size: clamp(20px, 3.2vw, 28px);
  font-style: italic;
  line-height: 1.45;
  background: rgba(0,0,0,0.25);
  border: 1px solid rgba(255,255,255,.25);
  border-radius: 16px;
  box-shadow: 0 6px 24px rgba(0,0,0,.25);
  position: relative;
}

.quote-slide::before,
.quote-slide::after {
  position: absolute;
  color: rgba(255,255,255,.9);
  font-size: 3rem;
  line-height: 1;
}

.quote-slide::before {
  content: "“";
  left: -14px;
  top: -10px;
}

.quote-slide::after {
  content: "”";
  right: -14px;
  bottom: -18px;
}

/* Reduced motion: disable auto video if user prefers */
@media (prefers-reduced-motion: reduce) {
  [data-background-video] {
    /* Reveal handles video; here we ensure text remains readable regardless */
    background: #000 !important;
  }
  .video-overlay { background: rgba(0,0,0,.6); }
}
</style>
