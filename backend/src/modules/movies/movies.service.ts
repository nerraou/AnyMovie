import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/modules/prisma/prisma.service';

interface CreateMovieDto {
  userId: number;
  movieId: number;
  posterPath: string | null;
  backdropPath: string | null;
  releaseDate: string;
  title: string;
  isFavorite?: boolean;
  isWatched?: boolean;
  isToWatch?: boolean;
}

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService) {}

  async tmdb_getPlayingMovies() {
    const api = process.env.TMDB_V3_API_BASE_URL + '/movie/now_playing';

    const response = await fetch(api, {
      headers: {
        Authorization: 'Bearer ' + process.env.TMDB_ACCESS_TOKEN,
      },
    });

    const movies = await response.json();

    return movies.results.map((movie: any) => {
      return {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        backdropPath: movie.backdrop_path,
      };
    });
  }

  async tmdb_getPopularMovies(page: number) {
    const searchParams = new URLSearchParams({
      page: page.toString(),
    });

    const api =
      process.env.TMDB_V3_API_BASE_URL + '/movie/popular?' + searchParams;

    const response = await fetch(api, {
      headers: {
        Authorization: 'Bearer ' + process.env.TMDB_ACCESS_TOKEN,
      },
    });

    const movies = await response.json();

    return movies.results.map((movie: any) => {
      return {
        id: movie.id,
        title: movie.title,
        releaseDate: movie.release_date,
        overview: movie.overview,
        posterPath: movie.poster_path,
      };
    });
  }

  async tmdb_getSearchedMovies(searchQuery: string, page: number) {
    const searchParams = new URLSearchParams({
      query: searchQuery,
      page: page.toString(),
    });

    const api =
      process.env.TMDB_V3_API_BASE_URL + '/search/movie?' + searchParams;

    const response = await fetch(api, {
      headers: {
        Authorization: 'Bearer ' + process.env.TMDB_ACCESS_TOKEN,
      },
    });

    const movies = await response.json();

    return movies.results.map((movie: any) => {
      return {
        id: movie.id,
        title: movie.title,
        releaseDate: movie.release_date,
        overview: movie.overview,
        posterPath: movie.poster_path,
      };
    });
  }

  async tmdb_getMovieById(movieId: number) {
    const searchParams = new URLSearchParams({
      append_to_response: 'credits',
    });

    const api = `${process.env.TMDB_V3_API_BASE_URL}/movie/${movieId}?${searchParams}`;

    const response = await fetch(api, {
      headers: {
        Authorization: 'Bearer ' + process.env.TMDB_ACCESS_TOKEN,
      },
    });

    if (response.status == HttpStatus.NOT_FOUND) {
      return null;
    }

    const data = await response.json();

    const cast = data.credits?.cast.map((person: any) => {
      return {
        id: person.id,
        name: person.name,
        profilePath: person.profile_path,
        character: person.character,
        order: person.order,
      };
    });

    return {
      id: data.id,
      title: data.title,
      overview: data.overview,
      runtime: data.runtime,
      originalLanguage: data.original_language,
      backdropPath: data.backdrop_path,
      posterPath: data.poster_path,
      releaseDate: data.release_date,
      status: data.status,
      budget: data.budget,
      revenue: data.revenue,
      genres: data.genres,
      cast,
    };
  }

  async getMovieById(movieId: number) {
    return this.prisma.movie.findFirst({
      where: {
        movieId,
      },
    });
  }

  async createMovie(data: CreateMovieDto) {
    return this.prisma.movie.create({
      data: {
        userId: data.userId,
        movieId: data.movieId,
        posterPath: data.posterPath,
        backdropPath: data.backdropPath,
        releaseDate: data.releaseDate,
        title: data.title,
        isFavorite: data.isFavorite,
        isWatched: data.isWatched,
        isToWatch: data.isToWatch,
      },
    });
  }

  updateMovieById(id: number, data: Partial<CreateMovieDto>) {
    return this.prisma.movie.updateMany({
      where: {
        id,
      },
      data,
    });
  }

  deleteMovieById(id: number) {
    return this.prisma.movie.delete({
      where: {
        id,
      },
    });
  }
}
