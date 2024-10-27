import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/category.entity';
import { ProductDtoUpdate } from './product.dto.update';
export declare class ProductsRepository {
    private productsRepository;
    private categoriesRepository;
    constructor(productsRepository: Repository<Product>, categoriesRepository: Repository<Category>);
    findAll(page?: number, limit?: number): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
    addProducts(): Promise<void>;
    saveProduct(newProduct: Omit<Product, 'orderDetail' | 'id'>): Promise<Product>;
    updateProduct(id: string, updateProduct: Partial<Product> | ProductDtoUpdate): Promise<Product>;
    deleteProduct(id: string): Promise<string>;
}
