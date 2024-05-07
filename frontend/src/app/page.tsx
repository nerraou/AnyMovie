"use client";

import { Suspense } from "react";
import InputSearch from "./components/atoms/InputSearch";
import MovieCard from "./components/molecules/MovieCard";
import MovieSlider from "./components/molecules/MovieSlider";
import RadioButtonGroup from "./components/molecules/RadioButtonGroup";
import { useGetPlayingMovies } from "./components/services/useGetPlayingMoviesQuery";

export default function Home() {
  return (
    <main className="flex flex-col bg-cream  items-center h-full">
      <div className="w-full">
        <Suspense fallback={<h1>Loading</h1>}>
          <MovieSlider />
        </Suspense>
      </div>

      <div className="w-full mt-10 flex justify-center flex-col items-center space-y-2">
        <h1 className="text-blue font-black text-5xl">ANY MOVIE</h1>
        <InputSearch onChange={() => {}} placeholder="Search" />
      </div>

      <div className="w-full items-start pl-32 mt-10 space-y-2">
        <h4 className="text-xl font-bold text-gunmetal">Filters</h4>
        <div>
          <p className="text-gunmetal font-normal text-lg pb-2">Genres</p>
          <RadioButtonGroup
            onChange={() => {}}
            value="genres"
            values={["action", "action", "adventure"]}
          />
        </div>
      </div>
      <div className="w-full flex justify-center mt-6 mb-9">
        <div className="grid grid-cols-4 gap-6">
          <MovieCard
            name="travolta"
            date="May 4, 2007"
            image="/travolta.jpg"
            isFavorit
            isToWatch
            isWatched
          />
          <MovieCard
            name="travolta"
            date="May 4, 2007"
            image="/travolta.jpg"
            isFavorit
            isToWatch
            isWatched
          />
          <MovieCard
            name="travolta"
            date="May 4, 2007"
            image="/travolta.jpg"
            isFavorit
            isToWatch
            isWatched
          />
          <MovieCard
            name="travolta"
            date="May 4, 2007"
            image="/travolta.jpg"
            isFavorit
            isToWatch
            isWatched
          />
          <MovieCard
            name="travolta"
            date="May 4, 2007"
            image="/travolta.jpg"
            isFavorit
            isToWatch
            isWatched
          />
          <MovieCard
            name="travolta"
            date="May 4, 2007"
            image="/travolta.jpg"
            isFavorit
            isToWatch
            isWatched
          />
        </div>
      </div>
    </main>
  );
}
