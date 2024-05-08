import { Injectable } from '@nestjs/common';

@Injectable()
export class MoviesService {
  async getPlayingMovies() {
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

  async getPopularMovies(page: number) {
    const api =
      process.env.TMDB_V3_API_BASE_URL +
      '/movie/popular?' +
      new URLSearchParams({
        page: page.toString(),
      });
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

  async getSearchedMovies(searchQuery: string, page: number) {
    const api =
      process.env.TMDB_V3_API_BASE_URL +
      '/search/movie?' +
      new URLSearchParams({
        query: searchQuery,
        page: page.toString(),
      });

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
}
