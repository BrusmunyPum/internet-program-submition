export type Genre = 'novel' | 'science' | 'history' | 'tech'

export interface Book {
  id: number
  title: string
  author: string
  genre: Genre
  copies: number // copies the library owns
  borrowed: number // copies borrowed right now
}
