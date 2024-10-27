import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './users-update.dto';
import { OrdersRepository } from 'src/orders/orders.repository';
import { Order } from 'src/orders/order.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,

    // private readonly ordersRepository: OrdersRepository,
  ) {}

  async getUsers(page: number = 1, limit: number = 5) {
    const users = await this.usersRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
    return users.map(({ password, ...userSinPassword }) => userSinPassword);
  }

  async getById(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: { orders: true },
    });
    if (!user) throw new NotFoundException(`User id: ${id} not found`);
    const { password, ...userSinPassword } = user; //También podría sacar isAdmin además de la password?
    return userSinPassword;
  }

  async createUser(user: Partial<User>) {
    //console.log('user: ', user);
    try {
      const newUser = await this.usersRepository.save(user);
      console.log('newUser: ', newUser);
      const dbUser = await this.usersRepository.findOneBy({ id: newUser.id });
      const { password, ...userSinPassword } = dbUser;
      return userSinPassword;
    } catch (err) {
      throw new Error('Error al crear el usuario');
    }
  }

  async updateUser(
    id: string,
    updateUser: UpdateUserDto,
  ): Promise<Partial<User>> {
    const userFound = await this.usersRepository.findOneBy({ id });
    if (!userFound) throw new NotFoundException('User not found');

    Object.assign(userFound, updateUser);
    const dbUser = await this.usersRepository.save(userFound);
    const { password, ...userSinPassword } = dbUser;
    return userSinPassword;
  }

  async setAdminRepository(id: string) {
    const userFound = await this.usersRepository.findOneBy({ id });
    if (!userFound) throw new NotFoundException('User not found');

    await this.usersRepository.update({ id }, { isAdmin: true });
    return;
  }

  //-------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------

  async deleteUser(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new Error('User not found');
    console.log('En repository antes de remove. User: ', user);

    // this.ordersRepository.restoreStockBeforeDeleteUser(id);

    await this.usersRepository.remove(user);
    console.log('En repository despues de remove. User: ', user);
    const { password, ...userSinPassword } = user;
    return { 'Usuario Eliminado: ': userSinPassword };
  }

  async getUserByEmail(email: string) {
    try {
      const user = await this.usersRepository.findOneBy({ email });
      return user;
    } catch (err) {
      throw new Error('En getUserByEmail: ' + err.message);
    }
  }
}

//  private users: User[] = [];
// save(newUser: User): string {
//   this.users.push(newUser);
//   return newUser.id;
// }

// findAll(page: number = 1, limit: number = 5): User[] {
//   const startIndex = (page - 1) * limit;
//   return this.users.slice(startIndex, startIndex + limit);
// }

// findOne(id: string): User {
//   return this.users.find((user) => user.id === id);
// }

// findUserByEmail(email: string): User | undefined {
//   return this.users.find((user) => user.email === email);
// }

// update(id: string, updateUser: User): number {
//   const indice = this.users.findIndex((user) => user.id === id);
//   this.users[indice] = { ...this.users[indice], ...updateUser };
//   return indice;
// }

// delete(id: string): string {
//   const indice = this.users.findIndex((user) => user.id === id);
//   this.users.splice(indice, 1);
//   return id;
// }
