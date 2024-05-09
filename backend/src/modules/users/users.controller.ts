import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../auth/decorators/user.decorators';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('movies')
  @UseGuards(JwtAuthGuard)
  async findUserMovies(@User('id') userId: number) {
    const movies = await this.usersService.findUserMovies(userId);

    return {
      movies,
    };
  }
}
