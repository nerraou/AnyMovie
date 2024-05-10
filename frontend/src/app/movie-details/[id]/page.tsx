"use client";

import MovieDetailesCast from "@/app/components/molecules/MovieDetailsCast";
import MovieDetailesGenerals from "@/app/components/molecules/MovieDetailsGenerals";
import MovieDetailesOverview from "@/app/components/molecules/MovieDetailsOverview";
import { useGetMovieById } from "@/app/components/services/useGetMovieByIdQuery";
import Layout from "@/app/components/templates/Layout";

interface MovieDetailsProps {
  params: {
    id: number;
  };
}

function MovieDetailes(props: MovieDetailsProps) {
  const { data } = useGetMovieById(props.params.id);

  return (
    <Layout contentClassName="flex flex-col bg-cream h-full space-y-6">
      <MovieDetailesOverview
        id={data.id}
        genres={data.genres}
        time={data.runtime}
        backdropPath={
          process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL + data.backdropPath
        }
        overview={data.overview}
        posterPath={
          process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL + data.posterPath
        }
        releaseDate={data.releaseDate}
        title={data.title}
        isFavorite
        isToWatch
        isWatched={false}
      />
      <div className="ml-36 pb-60 space-y-10">
        <MovieDetailesGenerals
          budget={data.budget}
          originalLanguqge="English"
          revenue={data.revenue}
          status={data.status}
        />
        <MovieDetailesCast cast={data.cast} />
      </div>
    </Layout>
  );
}

export default MovieDetailes;
