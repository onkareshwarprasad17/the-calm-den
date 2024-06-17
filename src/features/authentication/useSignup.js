import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address."
      );
    },
    onError: (err) => {
      console.error(err.message);
      toast.error("Error occurred while signing up, error: " + err.message);
    },
  });

  return { signup, isPending };
}
