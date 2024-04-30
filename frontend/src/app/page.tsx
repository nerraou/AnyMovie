"use client";

import InputPassword from "./components/atoms/InputPassword";
import InputSearch from "./components/atoms/InputSearch";
import InputText from "./components/atoms/InputText";
import AddToWatched from "./components/atoms/icons/AddToWatched";
import FillHeart from "./components/atoms/icons/FillHeart";
import Heart from "./components/atoms/icons/Heart";
import RemoveFromWatchLater from "./components/atoms/icons/RemoveFromWatchLater";
import WatchLater from "./components/atoms/icons/WatchLater";
import Watched from "./components/atoms/icons/Watched";
import MovieCard from "./components/molecules/MovieCard";
import RadioButtonGroup from "./components/molecules/RadioButtonGroup";

export default function Home() {
  return (
    <div className="flex flex-col bg-cream justify-center items-center">
      <MovieCard
        date="May 4, 2007"
        name="Travolta"
        image="/travolta.jpg"
        isFavorit
        isToWatch
        isWatched
      />
    </div>
  );
}
