import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as data from '../utils/data.json';
import { Category } from 'src/categories/category.entity';
import { ProductDtoUpdate } from './product.dto.update';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async findAll(page: number = 1, limit: number = 5): Promise<Product[]> {
    const products: Product[] = await this.productsRepository.find({
      relations: { category: true },
    });

    let productosConStock = products.filter((product) => product.stock > 0);
    const start = (page - 1) * limit;
    const end = start + limit;
    productosConStock = productosConStock.slice(start, end);

    return productosConStock;
  }

  //-------------------------------------------------------------------------
  //-------------------------------------------------------------------------
  async findOne(id: string): Promise<Product> {
    const product: Product = await this.productsRepository.findOne({
      where: { id },
      relations: { category: true },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  //-------------------------------------------------------------------------
  //-------------------------------------------------------------------------
  async addProducts(): Promise<void> {
    const categories = await this.categoriesRepository.find();

    if (data)
      for (const product of data) {
        const category = categories.find(
          (category) => category.name === product.category,
        );

        const newProduct = {
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          imgUrl: product.imgUrl,
          category: category,
        };

        await this.productsRepository
          .createQueryBuilder()
          .insert()
          .into(Product)
          .values(newProduct)
          .orUpdate(['description', 'price', 'stock', 'imgUrl'], ['name'])
          .execute();
      }
    else throw new NotFoundException('Products not found. File Data exists?');
  }

  //-------------------------------------------------------------------------
  //-------------------------------------------------------------------------

  async saveProduct(
    newProduct: Omit<Product, 'orderDetail' | 'id'>,
  ): Promise<Product> {
    const productCreated = this.productsRepository.create(newProduct);
    const productSaved = await this.productsRepository.save(productCreated);
    return productSaved;
  }

  async updateProduct(
    id: string,
    updateProduct: Partial<Product> | ProductDtoUpdate,
  ): Promise<Product> {
    const productFound = await this.productsRepository.findOneBy({ id });
    if (!productFound) throw new NotFoundException('Product not found');

    Object.assign(productFound, updateProduct);
    return await this.productsRepository.save(productFound);
  }

  async deleteProduct(id: string): Promise<string> {
    const deleteResult = await this.productsRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException('Product not found');
    }
    return id;
  }
}

/*
private products: Product[] = [];

  async save(newProduct: Product): string {
    this.products.push(newProduct);
    return newProduct.id;
  }

  async findAll(page: number = 1, limit: number = 5): Product[] {
    const startIndex = (page - 1) * limit;
    return this.products.slice(startIndex, startIndex + limit);
  }

  async findOne(id: string): Product {
    return this.products.find((product) => product.id === id);
  }

  async update(id: string, updateProduct: Product): number {
    const indice = this.products.findIndex((product) => product.id === id);
    this.products[indice] = { ...this.products[indice], ...updateProduct };
    return indice;
  }

  async delete(id: string): string {
    const indice = this.products.findIndex((product) => product.id === id);
    this.products.splice(indice, 1);
    return id;
  }*/
