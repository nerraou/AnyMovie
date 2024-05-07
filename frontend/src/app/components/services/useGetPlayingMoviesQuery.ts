import { useSuspenseQuery } from "@tanstack/react-query";
import baseQuery from "../utils/baseQuery";

async function getPlayingMovies() {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + `/movies/playing `;

  const res = await baseQuery(url);
  const response = res.json();
  return response;
}
export interface Movie {
  id: string;
  title: string;
  overview: string;
  backdropPath: string;
}

export function useGetPlayingMovies() {
  return useSuspenseQuery<Movie[]>({
    queryKey: ["playing-movies"],
    queryFn: () => {
      return getPlayingMovies();
    },
  });
}
