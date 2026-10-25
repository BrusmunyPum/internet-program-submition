# Component tree

Data goes down as props, changes go up as events.

## State

| State                       | Owner                 | Why there                                            |
| --------------------------- | --------------------- | ---------------------------------------------------- |
| `books`, `myLoans`          | `LibraryView`         | Both screens and the "My books (N)" button need them |
| `screen`                    | `LibraryView`         | Chooses which of the two screens is shown            |
| `search`, `genre` (filters) | `BookList`            | Only the list uses them                              |
| `left`, `isOut`             | `BookCard` (computed) | Calculated from the `book` prop, never stored        |
| `myBooks`, `visible`        | computed              | Calculated from other state, so not a second `ref`   |

When the app gets more routes (week 4), `books` and `myLoans` move to a Pinia store.

## App

```
App
└── RouterView
    └── LibraryView      route "/"
        state: books, myLoans, screen    computed: myBooks
        ├── BookList     (screen 1)
        └── MyBooks      (screen 2)
```

`LibraryView` handles `borrow(id)` and `return(id)`: it is the only component that changes `books` and `myLoans`.

## 1. Books

```
BookList             props: books, myLoans          emits: borrow(id)
│                    state: search, genre           computed: visible
└── BookCard         props: book, mine              emits: borrow(id)
                     computed: left, isOut
```

`BookCard` does not change the book. It emits `borrow(id)`, `BookList` passes it up, and `LibraryView` changes the data.

## 2. My books

```
MyBooks              props: books (= myBooks)       emits: return(id)
```

## 3. Book detail (not built yet)

```
BookDetail           props: book, mine              emits: borrow(id)
```
