import { useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";
import supabase from "../services/supabase";
import { subtractDates } from "../utils/helpers";

import Button from "../ui/Button";
import { guests } from "./data-guests";
import { cabins } from "./data-cabins";
import { bookings } from "./data-bookings";

async function deleteBookings() {
  const { error } = await supabase.from("bookings").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteGuests() {
  const { error } = await supabase.from("guests").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteCabins() {
  const { error } = await supabase.from("cabins").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function createBookings() {
  const { data: cabinIds } = await supabase
    .from("cabins")
    .select("id")
    .order("id");
  const allCabinIds = cabinIds.map((cabin) => cabin.id);

  const { data: guestIds } = await supabase
    .from("guests")
    .select("id")
    .order("id");
  const allGuestIds = guestIds.map((guest) => guest.id);

  const finalBookings = bookings.map((booking) => {
    let status;
    /* we could have wrapped the dates in Date constructor,
      below lines work because the methods accept date as string also
    */
    if (isPast(booking.endDate) && !isToday(booking.endDate))
      status = "checked-out";
    if (isToday(booking.startDate) || isFuture(booking.startDate))
      status = "unconfirmed";
    if (
      (isFuture(booking.endDate) || isToday(booking.endDate)) &&
      isPast(booking.startDate) &&
      !isToday(booking.startDate)
    )
      status = "checked-in";

    // calculate numNights
    const numNights = subtractDates(booking.endDate, booking.startDate);
    // caluculate extrasPrice, totalPrice, and cabinPrice
    const cabin = cabins.at(booking.cabinId - 1);
    const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
    const extrasPrice = booking.hasBreakfast
      ? numNights * 15 * booking.numGuests
      : 0;
    const totalPrice = extrasPrice + cabinPrice;

    // console.log(allGuestIds);
    return {
      ...booking,
      status,
      numNights,
      totalPrice,
      cabinPrice,
      extrasPrice,
      cabinId: allCabinIds.at(booking.cabinId - 1),
      guestId: allGuestIds.at(booking.guestId - 1),
    };
  });

  // console.log(finalBookings);

  const { error } = await supabase.from("bookings").insert(finalBookings);
  if (error) console.log(error.message);
}

async function createGuests() {
  const { error } = await supabase.from("guests").insert(guests).select();
  if (error) console.log(error.message);
}

async function createCabins() {
  const { error } = await supabase.from("cabins").insert(cabins);
  if (error) console.log(error.message);
}

function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);

    // Delete bookings first because cabinID and guestID are foreign keys present in the bookings table
    await deleteBookings();
    await deleteGuests();
    await deleteCabins();

    // create bookings last as it needs cabin and guest id, because we want guestID and cabinID in bookings table
    await createGuests();
    await createCabins();
    await createBookings();

    setIsLoading(false);
  }

  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
  }

  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "#e0e7ff",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3>SAMPLE DATA</h3>

      <Button onClick={uploadAll} disabled={isLoading}>
        Upload ALL
      </Button>

      <Button onClick={uploadBookings} disabled={isLoading}>
        Upload bookings ONLY
      </Button>
    </div>
  );
}

export default Uploader;
