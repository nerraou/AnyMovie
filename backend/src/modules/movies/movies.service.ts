import { HttpStatus, Injectable } from '@nestjs/common';

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

  async getSearchedMovies(searchQuery: string, page: number) {
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

  async getMovieById(movieId: number) {
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
      originaLanguage: data.origina_language,
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
}
