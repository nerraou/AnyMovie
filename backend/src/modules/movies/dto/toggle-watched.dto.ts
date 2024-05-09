import { IsInt, IsPositive, Max } from 'class-validator';

export class ToggleWatchedDto {
  @IsInt()
  @Max(2147483647)
  @IsPositive()
  movieId: number;
}
