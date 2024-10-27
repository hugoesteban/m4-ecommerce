import { ProductsService } from './products.service';
import { ProductDtoCreate } from './product.dto.create';
import { CategoriesService } from 'src/categories/categories.service';
import { ProductDtoUpdate } from './product.dto.update';
export declare class ProductsController {
    private readonly productsService;
    private readonly categoriesService;
    constructor(productsService: ProductsService, categoriesService: CategoriesService);
    findAllProductsController(page: number, limit: number): Promise<import("./product.entity").Product[]>;
    findOneProductsController(id: string): Promise<import("./product.entity").Product>;
    createProductsController(productDto: ProductDtoCreate): Promise<import("./product.entity").Product>;
    addProductsController(): Promise<string>;
    updateProductsController(id: string, productDto: ProductDtoUpdate): Promise<import("./product.entity").Product>;
    deleteProductsController(id: string): Promise<string>;
}
