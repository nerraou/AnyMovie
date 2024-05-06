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

  @Get('/cache')
  async cache() {
    return 'VALUE ' + (await this.cacheManager.get('key'));
  }

  @Get('/set')
  async setKey() {
    await this.cacheManager.set('key', 'value', 0);
    return 'OK';
  }
}
