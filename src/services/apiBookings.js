import supabase from "./supabase";
import { getToday } from "../utils/helpers";
import { PAGE_SIZE } from "../utils/constants";

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single(); // to grab the single object in the array

  if (error) {
    console.error("ERROR: ", error.message);
    throw new Error(`Booking ${id} could not be loaded`);
  }

  return data;
}

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

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("ERROR: ", error.message);
    throw new Error("Bookings could not be loaded");
  }

  return data;
}

export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday());

  if (error) {
    console.error("ERROR: ", error.message);
    throw new Error("Bookings could not be loaded");
  }

  return data;
}

export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error("ERROR: ", error.message);
    throw new Error("Bookings could not be loaded");
  }

  return data;
}

export async function getStaysTodayActivity() {
  /* 
  Conditions to check for today's activity
    status === "unconfirmed" && getToday(new Date(booking.startDate))
    status === "checked-in" && getToday(new Date(booking.endDate))
  
  This would need all the bookings data to be first extracted from the database
  */

  // alternative (better approach):- Use OR operator
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, countryFlag, nationality)")
    .or(
      `and(status.eq.unconfirmed, startDate.eq.${getToday()}), and(status.eq.checked-in, endDate.eq.${getToday()})`
    );

  if (error) {
    console.error("ERROR: ", error.message);
    throw new Error("Bookings could not be loaded");
  }

  return data;
}
