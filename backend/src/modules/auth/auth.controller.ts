import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User as UserEntity } from '@prisma/client';
import { AuthService } from './auth.service';
import UsernameExistsPipe from './pipes/username-exists.pipe';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  async signIn(@Request() req: Request & { user: UserEntity }) {
    const { user } = req;

    return this.authService.signIn(user);
  }

  @Post('sign-up')
  async signUp(@Body(UsernameExistsPipe) signUpDto: SignUpDto) {
    await this.authService.signUp(signUpDto);

    return {
      message: 'success',
    };
  }
}
