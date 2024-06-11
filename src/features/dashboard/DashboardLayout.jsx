import styled from "styled-components";

import Spinner from "../../ui/Spinner";

import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import { useCabins } from "../cabins/useCabins";

import Stats from "./Stats";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isPending: isPendingBookings } = useRecentBookings();
  const {
    confirmedStays,
    numDays,
    isPending: isPendingStays,
  } = useRecentStays();
  const { cabins, isPending: isLoadingCabins } = useCabins();

  if (isPendingBookings || isPendingStays || isLoadingCabins)
    return <Spinner />;

  //   console.log(bookings);
  console.log(confirmedStays);

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        cabinCount={cabins.length}
        numDays={numDays}
      />
      <p>Today's Activity</p>
      <p>Statistics</p>
      <p>Statistics</p>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
