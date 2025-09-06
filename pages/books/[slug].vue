<script setup lang="ts">
const { getByPath, getById } = useUmbraco()
const param = useRoute().params.slugOrId as string

const { data, pending, error } = await useAsyncData(`book-${param}`, async () => {
  try { return await getByPath(`/books/${param}`) } catch { return await getById(param) }
})

const b = computed(() => data.value)
const coverUrl = (c: any) => Array.isArray(c) ? c[0]?.url ?? '' : (c?.url ?? c?.src ?? '')
</script>

<template>
  <div class="p-6 max-w-3xl mx-auto">
    <div v-if="pending">Loading…</div>
    <div v-else-if="error || !b">Not found.</div>
    <div v-else>
      <img v-if="coverUrl(b.properties.cover)" :src="coverUrl(b.properties.cover)"
           class="w-full rounded-xl mb-6" alt="" />
      <h1 class="text-3xl font-semibold mb-2">{{ b.properties.title || b.name }}</h1>
      <p class="opacity-70 mb-4">{{ b.properties.price }}</p>
      <div v-html="b.properties.description?.markup"></div>
      <p class="mt-4 text-sm opacity-70">Author: {{ b.properties.author }}</p>
    </div>
  </div>
</template>
