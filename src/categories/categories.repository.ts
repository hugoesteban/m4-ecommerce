import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as data from '../utils/data.json';
import { Category } from './category.entity';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async getCategories(): Promise<Category[]> {
    return await this.categoriesRepository.find();
  }

  async addCategories(): Promise<void> {
    const uniqueCategories = new Set<string>();
    data.forEach((product) => {
      uniqueCategories.add(product.category);
    });

    for (const category of uniqueCategories) {
      const existingCategory = await this.categoriesRepository.findOne({
        where: { name: category },
      });

      if (!existingCategory) {
        await this.categoriesRepository
          .createQueryBuilder()
          .insert()
          .into(Category)
          .values({ name: category })
          .orIgnore()
          .execute();
        //const newCategory = this.categoriesRepository.create({ name: category });
        //await this.categoriesRepository.save(newCategory);
      }
    }
  }
}
