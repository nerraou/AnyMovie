import { signIn } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";

interface UseSignInMutationData {
  username: string;
  password: string;
}

export default function useSignInMutation() {
  return useMutation<any, any, UseSignInMutationData>({
    mutationFn(data) {
      return signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
      });
    },
  });
}
