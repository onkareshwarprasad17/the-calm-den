import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationKey: ["checkin"],
    mutationFn: ({ bookingId }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
      }),
    onSuccess: (data) => {
      toast.success(`Booking ${data.id} successfully checked in`);
      // {active: true} will invalidate all the active query keys
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: (err) =>
      toast.error("There was an error while checking in: ", err.message),
  });

  return { checkin, isCheckingIn };
}
