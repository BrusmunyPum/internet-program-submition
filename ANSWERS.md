# Week 3: Explain it

## 1. Using the array index as `:key` while filtering

Vue uses the key to decide which component instance belongs to which item. With the index as key, filtering
shifts events into different positions, but the card *instances* stay at the same index and only get new props.
So the local state of a card (for example an open details panel) stays at position 0 and now appears on a
different event. With `:key="e.id"` Vue moves, keeps or removes the correct instance, so the state follows its event.

## 2. Why `visible` is a computed and not a function in the template

A computed is cached: Vue tracks that it depends on `props.events`, `search` and `category`, and only recalculates
when one of them changes. A function called from the template runs again on every re-render of the component,
even when the re-render was caused by something unrelated. When I type in the search box, `search` changes,
so the computed recalculates once per keystroke and every place that uses `visible` (the count and the `v-for`)
reads the same cached result instead of filtering the list several times.

## 3. Why EventCard emits `book` instead of changing `event.booked`

First, props are read-only: the event belongs to `App`, so a child changing it breaks one-way data flow and Vue
warns about it. Second, the card cannot know all the rules of booking: `App` is the one that checks there is
still a seat, updates `myBookings` and saves to localStorage. Emitting keeps the card a reusable, simple component
("the user wants to book event 7") and keeps every change to the data in one place, which is easier to debug.

## 4. `const { booked } = reactive(event); booked++` does not update the page

Reactivity in Vue works through the Proxy returned by `reactive()`: only reads and writes *on that object*
(`state.booked++`) are tracked and trigger updates. Destructuring copies the current value of `booked` into a
plain local number, so the connection to the proxy is lost. `booked++` only changes that local variable,
and the reactive object, and therefore the page, never sees it. Use `state.booked++` or `toRefs()` instead.

## 5. Where `myBookings` lives, and why not in EventCard or EventList

`myBookings` lives in `App.vue`, the component that owns the events and shows the booking count in the header.
State should live in the lowest common parent of every component that needs it: the header (in App) reads it
and the booking (handled in App) changes it. If it lived in an `EventCard`, each card would have its own copy
and it would disappear when the card is filtered out; in `EventList` the header could not read it, and it
would be reset whenever the list is unmounted.
