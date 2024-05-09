import Image from "next/image";

import Heart from "../atoms/icons/Heart";
import Watched from "../atoms/icons/Watched";
import WatchLater from "../atoms/icons/WatchLater";
import RemoveFromWatchLater from "../atoms/icons/RemoveFromWatchLater";
import FillHeart from "../atoms/icons/FillHeart";
import AddToWatched from "../atoms/icons/AddToWatched";

interface MovieCardProps {
  name: string;
  image: string;
  date: string;
  isFavorite: boolean;
  isWatched: boolean;
  isToWatch: boolean;
}

function MovieCard(props: MovieCardProps) {
  return (
    <div className="bg-white border-4 rounded-xl border-light-blue p-3 shadow-lg w-60">
      {props.image && (
        <Image
          src={process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL + props.image}
          alt="movie image"
          width={200}
          height={230}
          className="object-contain rounded-lg"
        />
      )}
      <div className="flex justify-between mt-2">
        <div>
          <h1 className="text-dark-blue font-semibold">{props.name}</h1>
          <p className="text-blue font-light">{props.date}</p>
        </div>
        <div className="flex space-x-2">
          {props.isToWatch && <WatchLater />}
          {!props.isToWatch && <RemoveFromWatchLater />}

          {props.isFavorite && <FillHeart />}
          {!props.isFavorite && <Heart />}

          {props.isWatched && <Watched />}
          {!props.isWatched && <AddToWatched />}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
