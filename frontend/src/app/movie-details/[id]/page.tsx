import CircleFillAddToWatched from "@/app/components/atoms/icons/CircleFillAddToWatched";
import CircleFillFillHeart from "@/app/components/atoms/icons/CircleFillFillHeart";
import CircleFillHeart from "@/app/components/atoms/icons/CircleFillHeart";
import CircleFillRemoveFromWatchLater from "@/app/components/atoms/icons/CircleFillRemoveFromWatchLater";
import CircleFillWatchLater from "@/app/components/atoms/icons/CircleFillWatchLater";
import CircleFillWatched from "@/app/components/atoms/icons/CircleFillWatched";
import MovieDetailesOverview from "@/app/components/molecules/MovieDetailsOverview";

function MovieDetailes() {
  return (
    <div className="flex flex-col bg-cream  items-center h-full">
      <MovieDetailesOverview
        id="1"
        genre="Action"
        time="2h 30m"
        backdropPath="/background.jpg"
        overview="this is the movie overview"
        posterPath="/travolta.jpg"
        releaseDate="2011-20-08"
        title="Travolta"
        isFavorite
        isToWatch
        isWatched={false}
      />
    </div>
  );
}

export default MovieDetailes;
