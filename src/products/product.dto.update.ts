// src/products/dto/create-product.dto.ts

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsUrl,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class ProductDtoUpdate {
  @IsString()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(100, { message: 'El nombre no debe superar los 100 caracteres' })
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Product name',
    example: 'Update Product',
  })
  name?: string;

  @IsString()
  @MinLength(5, { message: 'La descripción debe tener al menos 5 caracteres' })
  @MaxLength(500, {
    message: 'La descripción no debe superar los 500 caracteres',
  })
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Product description ',
    example: 'This is a Update product',
  })
  description?: string;

  @IsNumber()
  @Min(0, { message: 'El precio debe ser al menos 0' })
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Product price',
    example: 1000,
  })
  price?: number;

  @IsNumber()
  @Min(0, { message: 'El stock debe ser al menos 0' })
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Product stock',
    example: 10,
  })
  stock?: number;

  @IsString()
  @MinLength(3, { message: 'La categoría debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'La categoría no debe superar los 50 caracteres' })
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Product category, must exists in categories',
    example: 'smartphone',
  })
  category?: string;

  @IsUrl({}, { message: 'La URL de la imagen debe ser válida' })
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Product image url',
    example: 'https://example.com/image.png',
  })
  imgUrl?: string;
}
