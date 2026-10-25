<script setup lang="ts">
import { computed, ref } from 'vue'
import BookList from '../components/BookList.vue'
import MyBooks from '../components/MyBooks.vue'
import { initialBooks } from '../data/books'
import type { Book } from '../types'

// This view owns the books and my loans, so it is the one that changes them.
// They move to a Pinia store when a second route needs them (week 4).
const books = ref<Book[]>(initialBooks.map((b) => ({ ...b })))
const myLoans = ref<number[]>([]) // ids of the books I borrowed

const myBooks = computed(() => books.value.filter((b) => myLoans.value.includes(b.id)))

// Two screens on one route, switched with a ref
const screen = ref<'books' | 'mine'>('books')

// One copy per book per person
function onBorrow(id: number) {
  const book = books.value.find((b) => b.id === id)
  if (book && book.borrowed < book.copies && !myLoans.value.includes(id)) {
    book.borrowed += 1
    myLoans.value.push(id)
  }
}

function onReturn(id: number) {
  const book = books.value.find((b) => b.id === id)
  if (book && myLoans.value.includes(id)) {
    book.borrowed -= 1
    myLoans.value = myLoans.value.filter((loanId) => loanId !== id)
  }
}
</script>

<template>
  <main>
    <header>
      <h1>Library</h1>
      <nav>
        <button :class="{ active: screen === 'books' }" @click="screen = 'books'">Books</button>
        <button :class="{ active: screen === 'mine' }" @click="screen = 'mine'">
          My books ({{ myLoans.length }})
        </button>
      </nav>
    </header>

    <BookList v-if="screen === 'books'" :books="books" :my-loans="myLoans" @borrow="onBorrow" />
    <MyBooks v-else :books="myBooks" @return="onReturn" />
  </main>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
nav {
  display: flex;
  gap: 8px;
}
nav button {
  background: white;
  color: #3178c6;
}
nav button.active {
  background: #3178c6;
  color: white;
}
</style>
