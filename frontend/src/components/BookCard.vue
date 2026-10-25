<script setup lang="ts">
import { computed } from 'vue'
import type { Book } from '../types'

const props = defineProps<{
  book: Book
  mine: boolean // I already borrowed this book
}>()

const emit = defineEmits<{
  (e: 'borrow', id: number): void
}>()

const left = computed(() => props.book.copies - props.book.borrowed)
const isOut = computed(() => left.value === 0)
</script>

<template>
  <article class="card" :class="{ out: isOut }">
    <p class="genre">{{ book.genre }}</p>
    <h2>{{ book.title }}</h2>
    <p class="author">{{ book.author }}</p>

    <p v-if="isOut" class="badge">None left</p>
    <p v-else class="left">{{ left }} of {{ book.copies }} left</p>

    <button :disabled="isOut || mine" @click="emit('borrow', book.id)">
      {{ mine ? 'Borrowed' : 'Borrow' }}
    </button>
  </article>
</template>

<style scoped>
.card {
  background: white;
  border-radius: 10px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.card.out {
  opacity: 0.7;
}
h2 {
  font-size: 1.1rem;
  margin: 0;
}
.genre {
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  color: #3178c6;
  margin: 0;
}
.author {
  color: #6b7280;
  margin: 0;
}
.left,
.badge {
  margin: 0;
  font-weight: 600;
}
.badge {
  color: white;
  background: #d73a49;
  align-self: flex-start;
  padding: 2px 10px;
  border-radius: 999px;
}
button {
  margin-top: auto;
  align-self: flex-start;
}
</style>
