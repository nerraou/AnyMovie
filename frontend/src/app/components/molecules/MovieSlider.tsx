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
  const [sliderRef] = useKeenSlider(
    {
      slides: {
        perView: 1,
      },
      loop: true,
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 4000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <div
      ref={sliderRef}
      className="keen-slider flex items-center overflow-hidden"
    >
      {props.movies.map((movie, index) => {
        return (
          <div
            key={index}
            className="keen-slider__slide flex justify-center overflow-visible"
            title={movie.name}
          >
            <div className="relative w-full h-96">
              <Image
                src={movie.image}
                alt="movie"
                fill
                className="absolute object-cover object-top"
              />
              <h1 className="absolute bottom-11 left-5 text-white font-black text-3xl">
                {movie.name}
              </h1>
              <p className="absolute bottom-4 left-5 text-white">
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
