import { ConflictException, Injectable, PipeTransform } from '@nestjs/common';

import { SignUpDto } from '../dto/sign-up.dto';

import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export default class UsernameExistsPipe implements PipeTransform {
  constructor(private readonly usersService: UsersService) {}

  async transform(value: SignUpDto) {
    const user = await this.usersService.findUserByUsername(value.username);

    if (user) {
      throw new ConflictException();
    }

    return value;
  }
}
