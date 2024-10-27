import { Product } from 'src/products/product.entity';
export declare class OrderCreateDto {
    userId: string;
    products: Partial<Product[]>;
}
