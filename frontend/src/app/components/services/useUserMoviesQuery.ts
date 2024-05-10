import { useQuery } from "@tanstack/react-query";
import baseQuery from "../utils/baseQuery";

interface Movie {
  id: number;
  userId: number;
  movieId: number;
  releaseDate: string;
  title: string;
  posterPath: string | null;
  backdropPath: string | null;
  isFavorite: boolean;
  isWatched: boolean;
  isToWatch: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UserMoviesQueryResponse {
  movies: Movie[];
}

interface UseUserMoviesQueryParams {
  accessToken?: string;
}

async function getUserMovies(params: UseUserMoviesQueryParams) {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + "/users/movies";

  const res = await baseQuery(url, {
    headers: {
      authorization: `Bearer ` + params.accessToken,
    },
  });
  const response = res.json();
  return response;
}

export function useUserMoviesQuery(params: UseUserMoviesQueryParams) {
  return useQuery<UserMoviesQueryResponse>({
    enabled: !!params.accessToken,
    queryKey: ["user-movies"],
    queryFn: () => {
      return getUserMovies(params);
    },
  });
}
