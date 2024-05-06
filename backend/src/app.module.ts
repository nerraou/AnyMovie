import { Module } from '@nestjs/common';
import { MoviesModule } from './modules/movies/movies.module';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MoviesModule,
    CacheModule.register<any>({
      isGlobal: true,
      store: redisStore,
      // Store-specific configuration:
      host: 'localhost',
      port: 6379,
    }),
  ],
})
export class AppModule {}
