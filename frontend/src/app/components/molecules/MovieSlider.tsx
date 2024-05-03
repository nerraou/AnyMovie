import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";

interface MovieSLiderProps {
  movies: Movie[];
}

interface Movie {
  image: string;
  name: string;
  description: string;
}

function MovieSLider(props: MovieSLiderProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 1,
    },
  });

  return (
    <div
      ref={sliderRef}
      className="keen-slider flex items-center border border-light-fg-link overflow-hidden"
    >
      {props.movies.map((movie, index) => {
        return (
          <div
            key={index}
            className="keen-slider__slide flex justify-center overflow-visible"
            title={movie.name}
          >
            <div className="relative w-full m-2">
              <Image
                src={movie.image}
                alt="movie"
                width={100}
                height={40}
                className="w-full h-96 object-cover object-top"
              />
              <h1 className="absolute bottom-16 left-5 text-white font-black">
                {movie.name}
              </h1>
              <p className="absolute bottom-10 left-5 text-white">
                {movie.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MovieSLider;
