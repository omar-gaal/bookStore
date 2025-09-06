<script setup lang="ts">
const { listByType } = useUmbraco()

// Shape your expected Book properties; adjust names to your doc type
type BookProps = {
  title?: string
  slug?: string
  price?: number
  cover?: { url: string } | { src: string } | any
  description?: string
}

const { data, pending, error } = await useAsyncData('books', () =>
  listByType<BookProps>('book', 1, 24)
)
</script>

<template>
  <div class="p-6 max-w-5xl mx-auto">
    <h1 class="text-2xl font-semibold mb-6">Books</h1>

    <div v-if="pending">Loading…</div>
    <div v-else-if="error">Failed to load books.</div>

    <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-6">
      <NuxtLink
        v-for="b in data?.items"
        :key="b.id"
        :to="b.route?.path || `/books/${b.properties.slug}`"
        class="rounded-xl shadow p-3 hover:shadow-lg transition"
      >
        <img
          v-if="(b.properties.cover as any)?.url || (b.properties.cover as any)?.src"
          :src="(b.properties.cover as any)?.url || (b.properties.cover as any)?.src"
          alt=""
          class="w-full h-44 object-cover rounded-lg mb-3"
        />
        <div class="font-medium line-clamp-2">{{ b.properties.title || b.name }}</div>
        <div class="text-sm opacity-70 mt-1">
          {{ typeof b.properties.price === 'number' ? `$${b.properties.price.toFixed(2)}` : '' }}
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style>
.line-clamp-2 {
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
</style>
