import { useMutation } from "@tanstack/react-query";
import baseQuery, { RequestError } from "../utils/baseQuery";

interface UseToggleToWatchMutationData {
  movieId: number;
  accessToken: string;
}

function toggleFavorite(data: UseToggleToWatchMutationData) {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + "/movies/toggle/to-watch";

  return baseQuery(url, {
    method: "POST",
    body: JSON.stringify({ movieId: data.movieId }),
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ` + data.accessToken,
    },
  });
}

export default function useToggleToWatchMutation() {
  return useMutation<any, RequestError, UseToggleToWatchMutationData>({
    mutationFn(data) {
      return toggleFavorite(data);
    },
  });
}
