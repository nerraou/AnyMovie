"use client";

import { Fragment, Suspense, useCallback, useEffect, useState } from "react";
import InputSearch from "./components/atoms/InputSearch";
import MovieCard from "./components/molecules/MovieCard";
import MovieSlider from "./components/molecules/MovieSlider";
import baseQuery from "./components/utils/baseQuery";
import { useInView } from "react-intersection-observer";
import {
  useQueryClient,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import Loading from "./components/atoms/icons/Loading";
import { debounce } from "lodash";

async function getMovies(page: number, query: string) {
  const url =
    process.env.NEXT_PUBLIC_API_BASE_URL +
    `/movies?page=${page}${query ? `&search_query=${query}` : ""}`;

  console.log("url: ", url);
  const res = await baseQuery(url);
  let nextPage: number | null = page + 1;
  const response = await res.json();

  if (response.count == 0) {
    nextPage = null;
  }

  return { movies: response, nextPage: nextPage };
}

interface Movie {
  id: string;
  title: string;
  overview: string;
  releaseDate: string;
  posterPath: string;
}

interface MoviesResponse {
  movies: Movie[];
}

export default function Home() {
  const { ref, inView } = useInView();
  const [query, setQuery] = useState("");
  const [virtualQuery, setVirtualQuery] = useState("");
  const queryClient = useQueryClient();

  const { data, isFetchingNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery<MoviesResponse>({
      queryKey: ["movies"],
      queryFn: ({ pageParam }) => {
        return getMovies(pageParam as number, query);
      },
      initialPageParam: 1,
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
    });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetQuery = useCallback(
    debounce((q) => {
      queryClient.resetQueries({ queryKey: ["movies"] });
      setQuery(q);
    }, 1000),
    []
  );
  return (
    <main className="flex flex-col bg-cream  items-center h-full">
      <div className="w-full">
        <Suspense fallback={<Loading />}>
          <MovieSlider />
        </Suspense>
      </div>
      <div className="w-full mt-10 flex justify-center flex-col items-center space-y-2 mb-9">
        <h1 className="text-blue font-black text-5xl">ANY MOVIE</h1>
        <InputSearch
          value={virtualQuery}
          onChange={(e) => {
            console.log("search");
            setVirtualQuery(e.target.value);
            debouncedSetQuery(e.target.value);
          }}
          placeholder="Search"
        />
      </div>

      <div className="w-full flex flex-col justify-center items-center mt-6 mb-9">
        <div className="grid grid-cols-4 gap-6">
          {data?.pages?.map((page, key) => {
            return (
              <Fragment key={key}>
                {page.movies.map((value) => {
                  return (
                    <MovieCard
                      key={value.id}
                      name={value.title}
                      date={value.releaseDate}
                      image={value.posterPath}
                      isFavorite
                      isToWatch
                      isWatched
                    />
                  );
                })}
              </Fragment>
            );
          })}
        </div>
        <div className="inline-flex justify-center mb-16 mt-8" ref={ref}>
          {isFetchingNextPage ? <Loading width="w-6" height="w-6" /> : null}
        </div>
      </div>
    </main>
  );
}
