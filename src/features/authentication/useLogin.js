import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      toast.success("Successfully logged in");
      queryClient.setQueryData(["user"], data.user); // in order to be added in react-query cache
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR: " + err.message);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isPending };
}
