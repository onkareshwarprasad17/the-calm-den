import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries(); // clear all queries
      navigate("/login", { replace: true });
      toast.success("User logged out successfully");
    },
    onError: (err) => {
      toast.error("Error while logging out, error: " + err.message);
    },
  });

  return { logout, isPending };
}
