import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

import { MoviesService } from './movies.service';
import { GetMoviesDto } from './dto/get-movies.dto';
import { ToggleFavoriteDto } from './dto/toggle-favorite.dto';
import { User } from '../auth/decorators/user.decorators';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ToggleToWatchDto } from './dto/toggle-to-watch.dto';
import { ToggleWatchedDto } from './dto/toggle-watched.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @UseInterceptors(CacheInterceptor)
  @Get('/playing')
  @CacheTTL(5000)
  getPlayingMovies() {
    return this.moviesService.tmdb_getPlayingMovies();
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(5000)
  getMovies(@Query() query: GetMoviesDto) {
    if (query.searchQuery) {
      return this.moviesService.tmdb_getSearchedMovies(
        query.searchQuery,
        query.page,
      );
    } else {
      return this.moviesService.tmdb_getPopularMovies(query.page);
    }
  }

  @Get(':id([0-9]{1,11})')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(5000)
  async getMovieById(@Param('id', ParseIntPipe) movieId: number) {
    const movie = await this.moviesService.tmdb_getMovieById(movieId);

    if (!movie) {
      throw new NotFoundException();
    }

    return movie;
  }

  @Post('toggle/favorite')
  @UseGuards(JwtAuthGuard)
  async toggleFavoriteMovie(
    @User('id') userId: number,
    @Body() toggleFavoriteDto: ToggleFavoriteDto,
  ) {
    const movieInDb = await this.moviesService.getMovieById(
      toggleFavoriteDto.movieId,
    );

    if (movieInDb) {
      if (!movieInDb.isWatched && !movieInDb.isToWatch) {
        await this.moviesService.deleteMovieById(movieInDb.id);
      } else {
        await this.moviesService.updateMovieById(movieInDb.id, {
          isFavorite: !movieInDb.isFavorite,
        });
      }

      return {
        message: 'success',
      };
    }

    const movie = await this.moviesService.tmdb_getMovieById(
      toggleFavoriteDto.movieId,
    );

    if (!movie) {
      throw new NotFoundException();
    }

    await this.moviesService.createMovie({
      userId,
      movieId: movie.id,
      posterPath: movie.posterPath,
      backdropPath: movie.backdropPath,
      releaseDate: movie.releaseDate,
      title: movie.title,
      isFavorite: true,
    });

    return {
      message: 'success',
    };
  }

  @Post('toggle/to-watch')
  @UseGuards(JwtAuthGuard)
  async toggleToWatchMovie(
    @User('id') userId: number,
    @Body() toggleToWatchDto: ToggleToWatchDto,
  ) {
    const movieInDb = await this.moviesService.getMovieById(
      toggleToWatchDto.movieId,
    );

    if (movieInDb) {
      if (!movieInDb.isWatched && !movieInDb.isFavorite) {
        await this.moviesService.deleteMovieById(movieInDb.id);
      } else {
        await this.moviesService.updateMovieById(movieInDb.id, {
          isToWatch: !movieInDb.isToWatch,
        });
      }

      return {
        message: 'success',
      };
    }

    const movie = await this.moviesService.tmdb_getMovieById(
      toggleToWatchDto.movieId,
    );

    if (!movie) {
      throw new NotFoundException();
    }

    await this.moviesService.createMovie({
      userId,
      movieId: movie.id,
      posterPath: movie.posterPath,
      backdropPath: movie.backdropPath,
      releaseDate: movie.releaseDate,
      title: movie.title,
      isFavorite: true,
    });

    return {
      message: 'success',
    };
  }

  @Post('toggle/watched')
  @UseGuards(JwtAuthGuard)
  async toggleWatchedMovie(
    @User('id') userId: number,
    @Body() toggleWatchedDto: ToggleWatchedDto,
  ) {
    const movieInDb = await this.moviesService.getMovieById(
      toggleWatchedDto.movieId,
    );

    if (movieInDb) {
      if (!movieInDb.isFavorite && !movieInDb.isToWatch) {
        await this.moviesService.deleteMovieById(movieInDb.id);
      } else {
        await this.moviesService.updateMovieById(movieInDb.id, {
          isWatched: !movieInDb.isWatched,
        });
      }

      return {
        message: 'success',
      };
    }

    const movie = await this.moviesService.tmdb_getMovieById(
      toggleWatchedDto.movieId,
    );

    if (!movie) {
      throw new NotFoundException();
    }

    await this.moviesService.createMovie({
      userId,
      movieId: movie.id,
      posterPath: movie.posterPath,
      backdropPath: movie.backdropPath,
      releaseDate: movie.releaseDate,
      title: movie.title,
      isFavorite: true,
    });

    return {
      message: 'success',
    };
  }
}
