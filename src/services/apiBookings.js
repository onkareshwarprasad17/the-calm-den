import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";

export async function getBookings({ filter, sortBy, currentPage }) {
  let query = supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)",
      { count: "exact" }
    );

  // FILTER
  if (filter) query = query.eq(filter.field, filter.value);

  // SORT
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  // PAGINATION
  if (currentPage) {
    // from-to would be 0-9, 10-19, as range method these params are 0-based and inclusive
    const from = (currentPage - 1) * PAGE_SIZE;
    const to = currentPage * PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data: bookings, error, count } = await query;

  if (error) {
    console.error("ERROR: ", error.message);
    throw new Error("Bookings could not be loaded");
  }

  return { bookings, count };
}

export async function deleteBooking(id) {
  const { error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error("ERROR: ", error.message);
    throw new Error("Bookings could not be loaded");
  }
}
