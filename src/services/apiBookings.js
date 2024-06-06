import supabase from "./supabase";

export async function getBookings({ filter, sortBy }) {
  let query = supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)"
    );

  // FILTER
  if (filter) query = query.eq(filter.field, filter.value);

  // SORT
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  const { data: bookings, error } = await query;

  if (error) {
    console.error("ERROR: ", error.message);
    throw new Error("Bookings could not be loaded");
  }

  return bookings;
}

export async function deleteBooking(id) {
  const { error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error("ERROR: ", error.message);
    throw new Error("Bookings could not be loaded");
  }
}
