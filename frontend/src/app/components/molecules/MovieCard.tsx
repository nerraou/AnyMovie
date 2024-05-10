"use client";

import Image from "next/image";

import Heart from "../atoms/icons/Heart";
import Watched from "../atoms/icons/Watched";
import WatchLater from "../atoms/icons/WatchLater";
import RemoveFromWatchLater from "../atoms/icons/RemoveFromWatchLater";
import FillHeart from "../atoms/icons/FillHeart";
import AddToWatched from "../atoms/icons/AddToWatched";
import useToggleFavoriteMutation from "../services/useToggleFavoriteMutation";

interface MovieCardProps {
  id: number;
  name: string;
  image?: string | null | undefined;
  date: string;
  isFavorite: boolean;
  isWatched: boolean;
  isToWatch: boolean;
}

function MovieCard(props: MovieCardProps) {
  const toggleFavoriteMutation = useToggleFavoriteMutation();

  let image = "/images/movie-poster-placeholder.jpg";

  if (props.image) {
    image = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL + props.image;
  }

  return (
    <div className="bg-white border-4 rounded-xl border-light-blue p-3 shadow-lg w-60">
      <Image
        src={image}
        alt="movie image"
        width={200}
        height={230}
        className="object-contain rounded-lg"
      />

      <div className="flex justify-between mt-2">
        <div>
          <h1 className="text-dark-blue font-semibold">{props.name}</h1>
          <p className="text-blue font-light">{props.date}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              toggleFavoriteMutation.mutate({
                movieId: props.id,
                accessToken: "",
              });
            }}
          >
            {props.isToWatch && <WatchLater />}
            {!props.isToWatch && <RemoveFromWatchLater />}
          </button>

          <button>
            {props.isFavorite && <FillHeart />}
            {!props.isFavorite && <Heart />}
          </button>

          <button>
            {props.isWatched && <Watched />}
            {!props.isWatched && <AddToWatched />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
