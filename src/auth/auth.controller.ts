import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto, SignUpDto } from './auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signIn(@Body() credentials: SignInDto) {
    const { email, password } = credentials;
    //if (!email || !password) return 'Email y contraseña son requeridos'; //validaciones no son requeridas porque las hace el DTO
    return this.authService.signIn(email, password);
  }

  @Post('signup')
  signUp(@Body() user: SignUpDto) {
    return this.authService.signUp(user);
  }
}
