import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import { useGetPlayingMovies } from "../services/useGetPlayingMoviesQuery";

function MovieSlider() {
  const { data } = useGetPlayingMovies();

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
      {data.map((movie) => {
        return (
          <div
            key={movie.id}
            className="keen-slider__slide flex justify-center overflow-visible"
            title={movie.title}
          >
            <div className="relative w-full h-96">
              <Image
                priority={false}
                src={
                  process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL +
                  movie.backdropPath
                }
                alt="movie"
                fill
                className="absolute object-cover object-top"
              />
              <div className="absolute bottom-11 left-5">
                <h1 className="text-white font-black text-3xl mb-1">
                  {movie.title}
                </h1>
                <p className="text-white">{movie.overview}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MovieSlider;
