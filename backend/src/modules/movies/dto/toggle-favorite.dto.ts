import { IsInt, IsPositive, Max } from 'class-validator';

export class ToggleFavoriteDto {
  @IsInt()
  @Max(2147483647)
  @IsPositive()
  movieId: number;
}
