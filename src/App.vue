<script setup lang="ts">
import { computed, ref, watch } from "vue";
import EventList from "./components/EventList.vue";
import { initialEvents } from "./data/events";
import { seatsLeft } from "./format";
import type { CampusEvent } from "./types";

// TODO 4 (bonus): keep my bookings after a page reload
//   - watch myBookings and save it to localStorage (JSON.stringify)
//   - read it back when the app starts, and add those seats to `booked`
const STORAGE_KEY = "campus-events-bookings";

function loadBookings(): number[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    // valid JSON is not enough: it must be a list of event ids
    return Array.isArray(parsed) ? parsed.filter((id): id is number => typeof id === "number") : [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

const savedBookings = loadBookings();

// TODO 1: a ref `myBookings` holding the ids of the events I booked (one entry per seat)
const myBookings = ref<number[]>([...savedBookings]);

// A reactive copy of the events with saved bookings replayed
const events = ref<CampusEvent[]>(
  initialEvents.map((e) => {
    const bookedCount = savedBookings.filter((id) => id === e.id).length;
    return { ...e, booked: e.booked + bookedCount };
  })
);

// TODO 2: a computed `bookingCount`
const bookingCount = computed(() => myBookings.value.length);

// TODO 3: onBook(id): find the event; if it still has a seat,
//         increase its `booked` and add the id to myBookings
function onBook(id: number) {
  const event = events.value.find((e) => e.id === id);
  if (event && seatsLeft(event) > 0) {
    event.booked += 1;
    myBookings.value.push(id);
  }
}

watch(
  myBookings,
  (val) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
  },
  { deep: true }
);
</script>

<template>
  <main>
    <header>
      <h1>Campus Events</h1>
      <!-- TODO 5: show the real count ("1 seat" / "N seats") -->
      <p class="mine">
        You have booked {{ bookingCount }} {{ bookingCount === 1 ? "seat" : "seats" }}.
      </p>
    </header>
    <EventList :events="events" @book="onBook" />
  </main>
</template>

<style scoped>
header { margin-bottom: 16px; }
.mine { color: #6b7280; margin: 0; }
</style>
