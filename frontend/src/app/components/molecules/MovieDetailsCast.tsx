import { cast } from "../services/useGetMovieByIdQuery";
import CastCard from "./CastCard";

interface castProps {
  cast: cast[];
}

function MovieDetailesCast(props: castProps) {
  return (
    <div>
      <h1 className="font-black text-2xl text-dark-blue mb-5">Cast</h1>

      <div className="pb-10 w-[700px] flex overflow-x-scroll space-x-6 scrollbar-thin  scrollbar-thumb-olive-green scrollbar-track-white">
        {props.cast?.map((cast) => {
          return (
            <CastCard
              key={cast.id}
              name={cast.name}
              characterName={cast.character}
              image={cast.profilePath}
            />
          );
        })}
      </div>
    </div>
  );
}

export default MovieDetailesCast;
