<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string
const { getByPath } = useUmbraco()

type BookProps = {
  title?: string
  price?: number
  cover?: { url: string } | { src: string } | any
  description?: string
}

const path = `/books/${slug}`
const { data, pending, error } = await useAsyncData(`book-${slug}`, () =>
  getByPath<BookProps>(path)
)
</script>

<template>
  <div class="p-6 max-w-3xl mx-auto">
    <div v-if="pending">Loading…</div>
    <div v-else-if="error">Not found.</div>
    <div v-else>
      <img
        v-if="(data!.properties.cover as any)?.url || (data!.properties.cover as any)?.src"
        :src="(data!.properties.cover as any)?.url || (data!.properties.cover as any)?.src"
        alt=""
        class="w-full rounded-xl mb-6"
      />
      <h1 class="text-3xl font-semibold mb-2">{{ data!.properties.title || data!.name }}</h1>
      <p class="opacity-70 mb-4">
        {{ typeof data!.properties.price === 'number' ? `$${data!.properties.price.toFixed(2)}` : '' }}
      </p>
      <p class="leading-7 whitespace-pre-line">{{ data!.properties.description }}</p>
    </div>
  </div>
</template>
