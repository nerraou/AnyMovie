import { useSuspenseQuery } from "@tanstack/react-query";
import baseQuery from "../utils/baseQuery";

async function getMovieById(id: number) {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + `/movies/${id}`;

  const res = await baseQuery(url);
  const response = res.json();

  return response;
}
export interface Movie {
  id: number;
  title: string;
  overview: string;
  runtime: number;
  backdropPath: string;
  posterPath: string;
  releaseDate: string;
  status: string;
  budget: number;
  revenue: number;
  cast: cast[];
  genres: genre[];
}

export interface cast {
  id: number;
  name: string;
  profilePath: string;
  character: string;
  order: Number;
}

interface genre {
  id: number;
  name: string;
}

export function useGetMovieById(id: number) {
  return useSuspenseQuery<Movie>({
    queryKey: ["movie-by-id"],
    queryFn: () => {
      return getMovieById(id);
    },
  });
}
