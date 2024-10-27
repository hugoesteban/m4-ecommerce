import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';
import { ConfigService } from '@nestjs/config';
import { UpdateUserDto } from './users-update.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private configService: ConfigService,
  ) {
    const dbHost = this.configService.get<string>('DB_HOST');
    console.log(`dbHost in users.service: ${dbHost}`);
  }

  async findAllUsersService(page: number, limit: number) {
    return this.usersRepository.getUsers(page, limit);
  }

  async findOneUsersService(id: string) {
    const user = this.usersRepository.getById(id);
    return user;
  }

  async updateUsersService(
    id: string,
    updateUser: UpdateUserDto,
  ): Promise<Partial<User>> {
    return this.usersRepository.updateUser(id, updateUser);
  }

  setAdminService(id: string) {
    return this.usersRepository.setAdminRepository(id);
  }

  async deleteUsersService(id: string) {
    console.log('En el service. id de User: ', id);
    return this.usersRepository.deleteUser(id);
  }
}
