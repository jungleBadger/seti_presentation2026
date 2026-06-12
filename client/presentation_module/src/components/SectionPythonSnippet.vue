<!-- PythonSnippetSlide.vue -->
<template>
  <section class="code-container">
    <h2 class="slide-title">Exemplo em Python: Busca Vetorial</h2>

    <pre v-pre>
<code
    class="language-python"
    data-trim
    data-line-numbers="1-3|4-6|9-14|16-20"
>
import numpy as np

# Normaliza vetor (‖v‖₂ = 1)
def normalize(v):
    return v / (np.linalg.norm(v) + 1e-12)

# Similaridade do cosseno (vetores normalizados)
def cosine(a, b):
    return np.dot(a, b)

def search(collection, query, k=3):
    q = normalize(query)
    scores = [(i, cosine(q, v)) for i, v in enumerate(collection)]
    scores.sort(key=lambda x: x[1], reverse=True)
    return scores[:k]

# Exemplo mínimo
collection = [normalize(np.random.rand(128)) for _ in range(5)]
query      = np.random.rand(128)
top        = search(collection, query, k=3)
print(top)  # => [(índice, score), ...]
</code>
    </pre>
  </section>
</template>

<script setup>
defineOptions({ name: "SectionPythonSnippet" });
</script>
