<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Book, Genre } from '../types'
import BookCard from './BookCard.vue'

const props = defineProps<{
  books: Book[]
  myLoans: number[]
}>()

const emit = defineEmits<{
  (e: 'borrow', id: number): void
}>()

const search = ref('')
const genre = ref<Genre | 'all'>('all')

// Books of the chosen genre whose title or author contains the search text, ignoring case
const visible = computed(() => {
  const q = search.value.trim().toLowerCase()
  return props.books.filter(
    (b) =>
      (genre.value === 'all' || b.genre === genre.value) &&
      (b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)),
  )
})
</script>

<template>
  <section>
    <div class="filters">
      <input
        v-model="search"
        type="search"
        placeholder="Search title or author"
        aria-label="Search"
      />
      <select v-model="genre" aria-label="Genre">
        <option value="all">All genres</option>
        <option value="novel">Novel</option>
        <option value="science">Science</option>
        <option value="history">History</option>
        <option value="tech">Tech</option>
      </select>
    </div>

    <p class="count">{{ visible.length }} of {{ books.length }} books</p>

    <div v-if="visible.length > 0" class="grid">
      <BookCard
        v-for="b in visible"
        :key="b.id"
        :book="b"
        :mine="myLoans.includes(b.id)"
        @borrow="emit('borrow', $event)"
      />
    </div>
    <p v-else class="empty">No books match your search.</p>
  </section>
</template>

<style scoped>
.filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.filters input {
  flex: 1;
  min-width: 200px;
}
.count {
  color: #6b7280;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}
.empty {
  padding: 32px;
  text-align: center;
  background: white;
  border-radius: 10px;
}
</style>
