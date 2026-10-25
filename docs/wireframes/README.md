# Wireframes

`[ ]` is a button, `[____]` is an input, `( v )` is a dropdown.

## 1. Books

```
+----------------------------------------------------------+
| Library             Books   My books (1)                 |
+----------------------------------------------------------+
| [ Search title or author ]       Genre ( All      v )    |
| 4 of 6 books                                             |
|                                                          |
| +----------------+  +----------------+  +--------------+ |
| | NOVEL          |  | TECH           |  | SCIENCE      | |
| | The Alchemist  |  | Clean Code     |  | Cosmos       | |
| | Paulo Coelho   |  | Robert Martin  |  | Carl Sagan   | |
| | 2 of 3 left    |  | 1 of 2 left    |  | [None left]  | |
| | [ Borrow ]     |  | [ Borrowed ]   |  | [ Borrow ]   | |
| +----------------+  +----------------+  +--------------+ |
+----------------------------------------------------------+
```

`[ Borrowed ]` is disabled: I already have this book. `[ Borrow ]` is disabled when no copy is left.

## 2. My books

```
+----------------------------------------------------------+
| Library             Books   My books (1)                 |
+----------------------------------------------------------+
| My books                                                 |
|                                                          |
| Clean Code · Robert Martin                  [ Return ]   |
|                                                          |
| (when empty)  You have not borrowed any book yet.        |
+----------------------------------------------------------+
```

## 3. Book detail (not built yet)

```
+----------------------------------------------------------+
| Library             Books   My books (1)                 |
+----------------------------------------------------------+
| < Back                                                   |
| The Alchemist                                  NOVEL     |
| Paulo Coelho                                             |
| 2 of 3 copies left                                       |
| [ Borrow ]                                               |
+----------------------------------------------------------+
```
