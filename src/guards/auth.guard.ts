import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Role } from 'src/users/roles.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    //extraer token
    const token = request.headers.authorization?.split(' ')[1];
    if (!token)
      throw new UnauthorizedException('No se ha proporcionado un token.');

    //validar token
    try {
      const secret = process.env.JWT_SECRET;
      //extraer payload
      const user = this.jwtService.verify(token, { secret });

      user.exp = new Date(user.exp * 1000); //formatear fecha, más legible
      user.iat = new Date(user.iat * 1000); //en qué tiempo se generó y en qué tiempo expira

      user.roles = user.isAdmin ? [Role.Admin] : [Role.User];

      //agregar payload a request
      request.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
