-- CreateTable
CREATE TABLE "movies" (
    "id" SERIAL NOT NULL,
    "movie_id" INTEGER NOT NULL,
    "release_date" VARCHAR(10) NOT NULL,
    "title" VARCHAR(1000) NOT NULL,
    "poster_path" VARCHAR(1000) NOT NULL,
    "is_favorite" BOOLEAN NOT NULL DEFAULT false,
    "is_watched" BOOLEAN NOT NULL DEFAULT false,
    "is_to_watch" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);
