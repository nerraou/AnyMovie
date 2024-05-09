-- CreateTable
CREATE TABLE "movies" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "movie_id" INTEGER NOT NULL,
    "release_date" VARCHAR(10) NOT NULL,
    "title" VARCHAR(1000) NOT NULL,
    "poster_path" VARCHAR(1000),
    "backdrop_path" VARCHAR(1000),
    "is_favorite" BOOLEAN NOT NULL DEFAULT false,
    "is_watched" BOOLEAN NOT NULL DEFAULT false,
    "is_to_watch" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "movies_movie_id_key" ON "movies"("movie_id");

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
