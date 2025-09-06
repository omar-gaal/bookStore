<script setup lang="ts">
const { listBooks } = useUmbraco()

type BookProps = {
  title?: string
  umbracoUrlName?: string
  price?: number
  cover?: any[] | any
  description?: { markup?: string }
  author?: string
}

const { data, pending, error } = await useAsyncData('books', async () => {
  const res = await listBooks()
  return res.items as Array<{ id:string; route?:{path?:string}; properties: BookProps }>
})

const coverUrl = (c: any) => Array.isArray(c) ? c[0]?.url ?? '' : (c?.url ?? c?.src ?? '')
</script>

<template>
  <div class="p-6 max-w-5xl mx-auto">
    <h1 class="text-2xl font-semibold mb-6">Books</h1>

    <div v-if="pending">Loading…</div>
    <div v-else-if="error">Failed to load books.</div>

    <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-6">
      <NuxtLink
        v-for="b in data"
        :key="b.id"
        :to="b.route?.path || `/books/${b.properties.umbracoUrlName || b.id}`"
        class="rounded-xl shadow p-3 hover:shadow-lg transition"
      >
        <img v-if="coverUrl(b.properties.cover)" :src="coverUrl(b.properties.cover)"
             class="w-full h-44 object-cover rounded-lg mb-3" alt="" />
        <div class="font-medium line-clamp-2">{{ b.properties.title || 'Untitled' }}</div>
        <div class="text-sm opacity-70 mt-1">
          {{ typeof b.properties.price === 'number' ? `${b.properties.price}` : '' }}
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style>
.line-clamp-2 { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
</style>
