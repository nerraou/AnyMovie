import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

import { HashService } from 'src/common/services/hash.service';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const hashedPassword = await this.hashService.hash(signUpDto.password);

    return this.usersService.createUser({
      username: signUpDto.username,
      password: hashedPassword,
    });
  }

  signIn(user: User) {
    const payload = { sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findUserByUsername(username);

    if (!user || user.password === null) {
      return null;
    }

    const isValidPassword = await this.hashService.compare(
      password,
      user.password,
    );

    if (isValidPassword) {
      return user;
    }

    return null;
  }
}
