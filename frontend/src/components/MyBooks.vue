<script setup lang="ts">
import type { Book } from '../types'

defineProps<{ books: Book[] }>()

const emit = defineEmits<{
  (e: 'return', id: number): void
}>()
</script>

<template>
  <section>
    <ul v-if="books.length > 0">
      <li v-for="b in books" :key="b.id">
        <span>{{ b.title }} · {{ b.author }}</span>
        <button @click="emit('return', b.id)">Return</button>
      </li>
    </ul>
    <p v-else class="empty">You have not borrowed any book yet.</p>
  </section>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  border-radius: 10px;
  padding: 12px 16px;
  margin-bottom: 8px;
}
.empty {
  padding: 32px;
  text-align: center;
  background: white;
  border-radius: 10px;
}
</style>
