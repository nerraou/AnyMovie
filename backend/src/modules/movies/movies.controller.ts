import { Controller, Get, Inject, UseInterceptors } from '@nestjs/common';
import { MoviesService } from './movies.service';
import {
  CACHE_MANAGER,
  CacheInterceptor,
  CacheTTL,
} from '@nestjs/cache-manager';
import { Cache } from '@nestjs/cache-manager';

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @UseInterceptors(CacheInterceptor)
  @Get('/playing')
  @CacheTTL(5000)
  getPlayingMovies() {
    console.log('get data from the api');
    return this.moviesService.getPlayingMovies();
  }

  @UseInterceptors(CacheInterceptor)
  @Get('/popular')
  @CacheTTL(5000)
  getPopularMovies() {
    console.log('get data from the api');
    return this.moviesService.getPopularMovies();
  }
}
