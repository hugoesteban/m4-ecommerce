import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'Nombre del Usuario',
    example: 'Username',
    minLength: 3,
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name?: string;

  @ApiProperty({
    description: 'Debe ser un correo electrónico válido',
    example: 'hugo2@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  //@IsOptional()
  @ApiProperty({
    description: 'Debe ingresar la contraseña correspondiente al mail',
    example: 'Pas$1234',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @IsStrongPassword({
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @ApiPropertyOptional({
    description: 'Dirección del usuario',
    example: 'Av. Argentina 123',
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address?: string;

  @ApiPropertyOptional({
    description: 'Teléfono del usuario',
    example: '542634489651',
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({
    description: 'País del usuario',
    example: 'Argentina',
  })
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  country?: string;

  @ApiPropertyOptional({
    description: 'Ciudad del usuario',
    example: 'San Juan',
  })
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  city?: string;
}
