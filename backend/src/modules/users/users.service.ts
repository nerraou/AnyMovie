import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from 'src/common/modules/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user,dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  findUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  findUserByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  findUserMovies(userId: number) {
    return this.prisma.movie.findMany({
      where: {
        userId,
      },
    });
  }
}
