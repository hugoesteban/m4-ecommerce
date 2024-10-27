import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Product } from 'src/products/product.entity';

export class OrderCreateDto {
  @ApiProperty({
    description: 'Id del usuario, formato UUID',
    example: '8e84c3db-dd30-45a4-ace4-deba97c948cb',
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'Arreglo de productos',
    example:
      '[{"id":"20f6cc72-bb86-4e53-9187-a8f785246a69"}, {"id":"48a20588-f6fc-40fe-99a1-e65eea59447a"}]',
  })
  @IsArray()
  @ArrayMinSize(1)
  products: Partial<Product[]>;
}
