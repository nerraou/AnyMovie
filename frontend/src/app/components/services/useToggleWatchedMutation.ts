import { useMutation } from "@tanstack/react-query";
import baseQuery, { RequestError } from "../utils/baseQuery";

interface UseToggleWatchedMutationData {
  movieId: number;
  accessToken: string;
}

function toggleWatched(data: UseToggleWatchedMutationData) {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + "/movies/toggle/watched";

  return baseQuery(url, {
    method: "POST",
    body: JSON.stringify({ movieId: data.movieId }),
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ` + data.accessToken,
    },
  });
}

export default function useToggleWatchedMutation() {
  return useMutation<any, RequestError, UseToggleWatchedMutationData>({
    mutationFn(data) {
      return toggleWatched(data);
    },
  });
}
