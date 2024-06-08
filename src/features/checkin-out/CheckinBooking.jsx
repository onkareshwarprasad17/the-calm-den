import { useEffect, useState } from "react";
import styled from "styled-components";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonText from "../../ui/ButtonText";
import { useMoveBack } from "../../hooks/useMoveBack";
import BookingDataBox from "../bookings/BookingDataBox";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const { booking, isPending } = useBooking();
  const { checkin, isCheckingIn } = useCheckin();

  useEffect(
    function () {
      setConfirmPaid(booking?.isPaid ?? false);
    },
    [booking?.isPaid]
  );

  const moveBack = useMoveBack();

  if (isPending) return <Spinner />;

  const { id: bookingId, guests, totalPrice } = booking;

  function handleCheckin() {
    if (!confirmPaid) return;
    checkin({ bookingId });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          id="confirm"
          disabled={confirmPaid || isCheckingIn}
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {formatCurrency(totalPrice)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
