import { Transform } from 'class-transformer';
import { IsString, IsStrongPassword } from 'class-validator';

export class SignUpDto {
  @IsString()
  @Transform(({ value }) => value?.toLowerCase())
  username: string;

  @IsStrongPassword()
  password: string;
}
