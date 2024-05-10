import { useMutation } from "@tanstack/react-query";
import baseQuery, { RequestError } from "../utils/baseQuery";

interface UseSignUpMutationData {
  username: string;
  password: string;
}

async function singUpUser(newUser: UseSignUpMutationData) {
  const api = process.env.NEXT_PUBLIC_API_BASE_URL + "/auth/sign-up";

  return await baseQuery(api, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(newUser),
  });
}

function useSignUpMutation() {
  return useMutation<Response, RequestError, UseSignUpMutationData>({
    mutationFn: singUpUser,
  });
}

export default useSignUpMutation;
