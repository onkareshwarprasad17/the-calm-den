import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationKey: ["checkout"],
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking ${data.id} successfully checked out`);
      // {active: true} will invalidate all the active query keys
      queryClient.invalidateQueries({ active: true });
    },
    onError: (err) =>
      toast.error("There was an error while checking out: ", err.message),
  });

  return { checkout, isCheckingOut };
}
