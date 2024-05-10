import { useMutation } from "@tanstack/react-query";
import baseQuery, { RequestError } from "../utils/baseQuery";

interface UseToggleFavoriteMutationData {
  movieId: number;
  accessToken: string;
}

function toggleFavorite(data: UseToggleFavoriteMutationData) {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + "/movies/toggle/favorite";

  return baseQuery(url, {
    method: "POST",
    body: JSON.stringify({ movieId: data.movieId }),
    headers: {
      authorization: `Bearer ` + data.accessToken,
    },
  });
}

export default function useToggleFavoriteMutation() {
  return useMutation<any, RequestError, UseToggleFavoriteMutationData>({
    mutationFn(data) {
      return toggleFavorite(data);
    },
  });
}
