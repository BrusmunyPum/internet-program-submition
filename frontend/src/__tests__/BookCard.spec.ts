import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BookCard from '../components/BookCard.vue'
import type { Book } from '../types'

const book: Book = {
  id: 2,
  title: 'Clean Code',
  author: 'Robert Martin',
  genre: 'tech',
  copies: 2,
  borrowed: 0,
}

describe('BookCard', () => {
  it('shows the title and the copies left', () => {
    const w = mount(BookCard, { props: { book, mine: false } })
    expect(w.find('h2').text()).toBe('Clean Code')
    expect(w.text()).toContain('2 of 2 left')
  })

  it('emits borrow with the book id', async () => {
    const w = mount(BookCard, { props: { book, mine: false } })
    await w.find('button').trigger('click')
    expect(w.emitted('borrow')).toEqual([[2]])
  })

  it('disables the button when no copy is left', () => {
    const w = mount(BookCard, { props: { book: { ...book, borrowed: 2 }, mine: false } })
    expect(w.find('.badge').text()).toBe('None left')
    expect(w.find('button').attributes('disabled')).toBeDefined()
  })

  it('disables the button when I already borrowed it', () => {
    const w = mount(BookCard, { props: { book, mine: true } })
    expect(w.find('button').text()).toBe('Borrowed')
    expect(w.find('button').attributes('disabled')).toBeDefined()
  })
})
