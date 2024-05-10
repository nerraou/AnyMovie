"use client";

import Image from "next/image";

import Heart from "../atoms/icons/Heart";
import Watched from "../atoms/icons/Watched";
import WatchLater from "../atoms/icons/WatchLater";
import RemoveFromWatchLater from "../atoms/icons/RemoveFromWatchLater";
import FillHeart from "../atoms/icons/FillHeart";
import AddToWatched from "../atoms/icons/AddToWatched";
import useToggleFavoriteMutation from "../services/useToggleFavoriteMutation";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import { useState } from "react";
import useToggleToWatchMutation from "../services/useToggleToWatchMutation";
import useToggleWatchedMutation from "../services/useToggleWatchedMutation";
import Link from "next/link";

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
  const toggleToWatchMutation = useToggleToWatchMutation();
  const toggleWatchedMutation = useToggleWatchedMutation();

  const { data } = useSession();

  const [isFavorite, setIsFavorite] = useState(props.isFavorite);
  const [isToWatch, setToWatch] = useState(props.isToWatch);
  const [isWatched, setIsWatched] = useState(props.isWatched);

  let image = "/images/movie-poster-placeholder.jpg";

  if (props.image) {
    image = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL + props.image;
  }

  return (
    <div className="bg-white border-4 rounded-xl border-light-blue p-3 shadow-lg w-60 h-[300]">
      <Link href={`/movie-details/${props.id}`}>
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
          <div
            className={clsx("flex space-x-2", {
              hidden: !data,
            })}
          >
            <button
              disabled={toggleToWatchMutation.isPending}
              onClick={(e) => {
                e.preventDefault();

                toggleToWatchMutation.mutate({
                  movieId: props.id,
                  accessToken: data?.user.accessToken as string,
                });
                setToWatch(!isToWatch);
              }}
            >
              {isToWatch && <WatchLater />}
              {!isToWatch && <RemoveFromWatchLater />}
            </button>

            <button
              disabled={toggleFavoriteMutation.isPending}
              onClick={(e) => {
                e.preventDefault();

                toggleFavoriteMutation.mutate({
                  movieId: props.id,
                  accessToken: data?.user.accessToken as string,
                });
                setIsFavorite(!isFavorite);
              }}
            >
              {isFavorite && <FillHeart />}
              {!isFavorite && <Heart />}
            </button>

            <button
              disabled={toggleWatchedMutation.isPending}
              onClick={(e) => {
                e.preventDefault();

                toggleWatchedMutation.mutate({
                  movieId: props.id,
                  accessToken: data?.user.accessToken as string,
                });
                setIsWatched(!isWatched);
              }}
            >
              {isWatched && <Watched />}
              {!isWatched && <AddToWatched />}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;
