<!-- JuliaSnippetSlide.vue -->
<template>
  <section class="code-container">
    <h2 class="slide-title">Exemplo em Julia: Busca Vetorial</h2>

    <pre v-pre>
<code
    class="language-julia"
    data-trim
    data-line-numbers="1-4|6-7|14-20|22-26"
>
using LinearAlgebra

# Normaliza vetor (‖v‖₂ = 1)
normalize!(v) = (v ./= norm(v) + eps(); v)

# Similaridade do cosseno (vetores normalizados)
cosine(a, b) = dot(a, b)

"""
  search(collection, query; k=3)
Retorna os k itens com maior similaridade ao 'query'.
Assume que todos os vetores já estão normalizados.
"""
function search(collection::Vector{Vector{Float64}},
                query::Vector{Float64}; k::Int=3)
    q = copy(query); normalize!(q)
    scores = [(i, cosine(q, v)) for (i, v) in enumerate(collection)]
    sort!(scores, by = x -> x[2], rev = true)
    return first(scores, k)
end

# Exemplo mínimo
collection = [normalize!(rand(128)) for _ in 1:5]
query      = rand(128)
top        = search(collection, query; k=3)
println(top)  # => [(índice, score), ...]
</code>
    </pre>
  </section>
</template>

<script setup>
defineOptions({ name: "SectionJuliaSnippet" });
</script>
