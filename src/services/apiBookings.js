import supabase from "./supabase";

export async function getBookings() {
  const { data: bookings, error } = await supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)"
    );

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
