import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

import { MoviesService } from './movies.service';
import { GetMoviesDto } from './dto/get-movies-dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @UseInterceptors(CacheInterceptor)
  @Get('/playing')
  @CacheTTL(5000)
  getPlayingMovies() {
    return this.moviesService.getPlayingMovies();
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(5000)
  getMovies(@Query() query: GetMoviesDto) {
    if (query.searchQuery) {
      return this.moviesService.getSearchedMovies(
        query.searchQuery,
        query.page,
      );
    } else {
      return this.moviesService.getPopularMovies(query.page);
    }
  }

  @Get(':id([0-9]{1,11})')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(5000)
  async getMovieById(@Param('id', ParseIntPipe) movieId: number) {
    const movie = await this.moviesService.getMovieById(movieId);

    if (!movie) {
      throw new NotFoundException();
    }

    return movie;
  }
}
