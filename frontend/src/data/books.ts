import type { Book } from '../types'

// Hard-coded for now; a mock API replaces it later
export const initialBooks: Book[] = [
  { id: 1, title: 'The Alchemist', author: 'Paulo Coelho', genre: 'novel', copies: 3, borrowed: 1 },
  { id: 2, title: 'Clean Code', author: 'Robert Martin', genre: 'tech', copies: 2, borrowed: 0 },
  { id: 3, title: 'Cosmos', author: 'Carl Sagan', genre: 'science', copies: 1, borrowed: 1 },
  {
    id: 4,
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    genre: 'history',
    copies: 4,
    borrowed: 2,
  },
  {
    id: 5,
    title: 'The Pragmatic Programmer',
    author: 'Andy Hunt',
    genre: 'tech',
    copies: 2,
    borrowed: 1,
  },
  {
    id: 6,
    title: 'Norwegian Wood',
    author: 'Haruki Murakami',
    genre: 'novel',
    copies: 2,
    borrowed: 0,
  },
]
