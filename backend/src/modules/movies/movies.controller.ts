import {
  Controller,
  Get,
  Inject,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import {
  CACHE_MANAGER,
  CacheInterceptor,
  CacheTTL,
} from '@nestjs/cache-manager';
import { Cache } from '@nestjs/cache-manager';
import { GetMoviesDto } from './dto/get-movies-tdo';

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
  @Get('/movies')
  @CacheTTL(5000)
  getMovies(@Query() query: GetMoviesDto) {
    console.log('query', query);
    if (query.searchQuery) {
      console.log('search movies');
      return this.moviesService.getSearchedMovies(
        query.searchQuery,
        query.page,
      );
    } else {
      console.log('nop');
      return this.moviesService.getPopularMovies(query.page);
    }
  }
}
