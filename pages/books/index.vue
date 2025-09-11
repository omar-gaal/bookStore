<script setup>
const { listBooks } = useUmbraco()


// get the data
const { data, pending, error } = await useAsyncData('books', () => listBooks())

const books = computed(() => (data.value?.items || []).filter(i => i.contentType === 'book'))



</script>

<template>
  <div class="p-6 max-w-5xl mx-auto">
    <h1 class="text-2xl font-semibold mb-6">Books</h1>

    <div v-if="pending">Loading…</div>
    <div v-else-if="error">Couldn’t load books.</div>

    <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-6">
      <ul>
        <li v-for="book in books" :key="book.id">
          {{ book.properties.title }}
        </li>
      </ul>
      
      
    </div>
  </div>
</template>
