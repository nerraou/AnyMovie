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
}
