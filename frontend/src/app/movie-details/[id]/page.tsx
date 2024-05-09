import MovieDetailesCast from "@/app/components/molecules/MovieDetailsCast";
import MovieDetailesGenerals from "@/app/components/molecules/MovieDetailsGenerals";
import MovieDetailesOverview from "@/app/components/molecules/MovieDetailsOverview";

function MovieDetailes() {
  return (
    <main className="flex flex-col bg-cream h-full space-y-6">
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
      <div className="ml-36 pb-60 space-y-10">
        <MovieDetailesGenerals
          budget={10000000}
          originalLanguqge="English"
          revenue={6418028}
          status="Released"
        />
        <MovieDetailesCast />
      </div>
    </main>
  );
}

export default MovieDetailes;
