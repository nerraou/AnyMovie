"use client";

import InputSearch from "@/app/components/atoms/InputSearch";
import MovieCard from "@/app/components/molecules/MovieCard";
import { useUserMoviesQuery } from "@/app/components/services/useUserMoviesQuery";
import Layout from "@/app/components/templates/Layout";
import { Tab as HTab } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, ReactNode, useMemo, useState } from "react";

interface TabItemProps {
  title: ReactNode | ReactNode[];
}

function TabItem(props: TabItemProps) {
  return (
    <HTab as={Fragment}>
      {({ selected }) => (
        <div className="p-2 outline-none">
          <button className="font-bold text-sm mb-2 text-dark-blue">
            {props.title}
          </button>

          <div
            className={clsx("h-1 bg-light-blue rounded-lg", {
              hidden: !selected,
            })}
          />
        </div>
      )}
    </HTab>
  );
}

export default function UserMovies() {
  const [type, selectedType] = useState("favorites");
  const [searchQuery, setSearchQuery] = useState("");

  const userMoviesQuery = useUserMoviesQuery({
    accessToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTcxNTI4NjcxOH0.LcDF-33nMssU17S81vDPZ3aw5kgqIGJPjb3wccBU0YU",
  });

  const movies = useMemo(() => {
    if (!userMoviesQuery.data) {
      return [];
    }

    return userMoviesQuery.data.movies.filter((movie) => {
      const hasSearchQuery = movie.title.includes(searchQuery);

      if (type == "favorites") {
        return movie.isFavorite && hasSearchQuery;
      }

      if (type == "to-watch") {
        return movie.isToWatch && hasSearchQuery;
      }

      if (type == "watched") {
        return movie.isWatched && hasSearchQuery;
      }
    });
  }, [userMoviesQuery.data, type, searchQuery]);

  return (
    <Layout className="bg-cream h-screen" contentClassName="px-16">
      <HTab.Group
        onChange={(selectedIndex) => {
          if (selectedIndex == 0) {
            selectedType("favorites");
          } else if (selectedIndex == 1) {
            selectedType("to-watch");
          } else {
            selectedType("watched");
          }
        }}
      >
        <HTab.List className="flex">
          <TabItem title="Favorties" />
          <TabItem title="To Watch" />
          <TabItem title="Watched" />
        </HTab.List>

        <div className="w-full mt-10 my-8">
          <InputSearch
            width="max-w-96 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
          />
        </div>

        <HTab.Panels className="mt-3 grid grid-cols-4 gap-6">
          <HTab.Panel>
            {movies?.map((value) => {
              return (
                <MovieCard
                  key={value.id}
                  id={value.id}
                  name={value.title}
                  date={value.releaseDate}
                  image={value.posterPath}
                  isFavorite={value.isFavorite}
                  isToWatch={value.isToWatch}
                  isWatched={value.isWatched}
                />
              );
            })}
          </HTab.Panel>

          <HTab.Panel>
            {movies?.map((value) => {
              return (
                <MovieCard
                  key={value.id}
                  id={value.id}
                  name={value.title}
                  date={value.releaseDate}
                  image={value.posterPath}
                  isFavorite={value.isFavorite}
                  isToWatch={value.isToWatch}
                  isWatched={value.isWatched}
                />
              );
            })}
          </HTab.Panel>

          <HTab.Panel>
            {movies?.map((value) => {
              return (
                <MovieCard
                  key={value.id}
                  id={value.id}
                  name={value.title}
                  date={value.releaseDate}
                  image={value.posterPath}
                  isFavorite={value.isFavorite}
                  isToWatch={value.isToWatch}
                  isWatched={value.isWatched}
                />
              );
            })}
          </HTab.Panel>
        </HTab.Panels>
      </HTab.Group>
    </Layout>
  );
}
