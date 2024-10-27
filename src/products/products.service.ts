import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductsRepository } from './products.repository';
import { ProductDtoCreate } from './product.dto.create';
import { ProductDtoUpdate } from './product.dto.update';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async createProductsService(
    newProduct: Omit<Product, 'orderDetail' | 'id'>,
  ): Promise<Product> {
    return this.productsRepository.saveProduct(newProduct);
  }

  //-------------------------------------------------------------------------
  //-------------------------------------------------------------------------
  async addProductsService(): Promise<string> {
    await this.productsRepository.addProducts();
    return 'Productos agregados';
  }

  //-------------------------------------------------------------------------
  //-------------------------------------------------------------------------

  async findAllProductsService(
    page: number,
    limit: number,
  ): Promise<Product[]> {
    return this.productsRepository.findAll(page, limit);
  }

  //-------------------------------------------------------------------------
  //-------------------------------------------------------------------------

  async findOneProductsService(id: string): Promise<Product> {
    return this.productsRepository.findOne(id);
  }

  //-------------------------------------------------------------------------
  //-------------------------------------------------------------------------
  async updateProductsService(
    id: string,
    updateProduct: Partial<Product> | ProductDtoUpdate,
  ): Promise<Product> {
    return this.productsRepository.updateProduct(id, updateProduct);
  }

  async deleteProductsService(id: string): Promise<string> {
    return this.productsRepository.deleteProduct(id);
  }
}
