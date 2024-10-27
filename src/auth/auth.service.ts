import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}
  async signIn(email: string, password: string) {
    const foundUser = await this.usersRepository.getUserByEmail(email);
    if (!foundUser)
      throw new BadRequestException('Email o contraseña incorrecta');

    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordValid)
      throw new BadRequestException('Email o contraseña incorrecta');

    //Firma de Token
    const payload = {
      id: foundUser.id,
      email: foundUser.email,
      isAdmin: foundUser.isAdmin,
    };
    const token = this.jwtService.sign(payload);
    return {
      message: 'Usuario logueado',
      user: foundUser,
      token: token,
    };
  }

  //----------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------

  async signUp(user: Partial<User>) {
    //verificar que el usuario no exista
    console.log('En signUp Service');

    const { email, password } = user;
    const foundUser = await this.usersRepository.getUserByEmail(email);
    if (foundUser) throw new BadRequestException('El mail ya existe');
    console.log('El usuario no existe, se puede registrar');

    //Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword)
      throw new BadRequestException('Error al hashear la contraseña');
    console.log('Se ha hasheado la contraseña');

    console.log('Antes de crear usuario:');
    console.log(user);

    //Crear usuario en BD
    const newUser = await this.usersRepository.createUser({
      ...user,
      password: hashedPassword,
    });
    console.log('Se creó nuevo usuario');
    console.log('Usuario de BD: ', newUser);
    return newUser;
  }
}
