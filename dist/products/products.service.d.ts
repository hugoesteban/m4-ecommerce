import { Product } from './product.entity';
import { ProductsRepository } from './products.repository';
import { ProductDtoUpdate } from './product.dto.update';
export declare class ProductsService {
    private readonly productsRepository;
    constructor(productsRepository: ProductsRepository);
    createProductsService(newProduct: Omit<Product, 'orderDetail' | 'id'>): Promise<Product>;
    addProductsService(): Promise<string>;
    findAllProductsService(page: number, limit: number): Promise<Product[]>;
    findOneProductsService(id: string): Promise<Product>;
    updateProductsService(id: string, updateProduct: Partial<Product> | ProductDtoUpdate): Promise<Product>;
    deleteProductsService(id: string): Promise<string>;
}
