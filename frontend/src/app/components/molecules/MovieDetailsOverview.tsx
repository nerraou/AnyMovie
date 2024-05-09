import Image from "next/image";
import CircleFillWatchLater from "../atoms/icons/CircleFillWatchLater";
import CircleFillRemoveFromWatchLater from "../atoms/icons/CircleFillRemoveFromWatchLater";
import CircleFillFillHeart from "../atoms/icons/CircleFillFillHeart";
import CircleFillHeart from "../atoms/icons/CircleFillHeart";
import CircleFillWatched from "../atoms/icons/CircleFillWatched";
import CircleFillAddToWatched from "../atoms/icons/CircleFillAddToWatched";

interface MovieDetailesOverviewProps {
  id: number;
  title: string;
  genres: genre[];
  time: number;
  overview: string;
  releaseDate: string;
  posterPath: string;
  backdropPath: string;
  isFavorite: boolean;
  isWatched: boolean;
  isToWatch: boolean;
}

interface genre {
  id: number;
  name: string;
}

function timeConvert(n: number) {
  var num = n;
  var hours = num / 60;
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return rhours + "h " + rminutes + "m.";
}

function MovieDetailesOverview(props: MovieDetailesOverviewProps) {
  return (
    <div className="w-full">
      <div className="relative w-full h-96">
        <Image
          priority={false}
          src={props.backdropPath}
          alt="movie"
          fill
          className="absolute object-cover object-top"
        />
        <div className="absolute pl-36  py-8 h-full w-full flex">
          <div className="relative h-full w-56">
            <Image
              priority={false}
              src={props.posterPath}
              alt="movie"
              fill
              className="absolute object-cover object-top rounded-lg"
            />
          </div>

          <div className="pl-5 pt-4 w-full">
            <h1 className="text-white font-black text-2xl mb-1">
              {props.title}
            </h1>

            <ul className="w-full list-disc inline-flex space-x-2 flex-1 text-white list-inside font-sans text-xs">
              <li>{props.releaseDate}</li>
              <li className="flex">
                {props.genres.map((genre) => {
                  return (
                    <p className="px-1" key={genre.id}>
                      {genre.name}
                    </p>
                  );
                })}
              </li>
              <li>{timeConvert(props.time)}</li>
            </ul>
            <div className="flex space-x-2 py-3">
              {props.isToWatch && <CircleFillWatchLater />}
              {!props.isToWatch && <CircleFillRemoveFromWatchLater />}

              {props.isFavorite && <CircleFillFillHeart />}
              {!props.isFavorite && <CircleFillHeart />}

              {props.isWatched && <CircleFillWatched />}
              {!props.isWatched && <CircleFillAddToWatched />}
            </div>

            <h1 className="text-white font-black text-2xl">Overview</h1>
            <p className="text-white">{props.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailesOverview;
