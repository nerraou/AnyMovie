import { Expose, Type } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class GetMoviesDto {
  @IsInt()
  @Type(() => Number)
  @IsPositive()
  @IsOptional()
  page = 1;

  @Expose({ name: 'search_query' })
  @IsOptional()
  @IsString()
  @Length(1, 255)
  searchQuery?: string;
}
