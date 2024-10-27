import { Repository } from 'typeorm';
import { Category } from './category.entity';
export declare class CategoriesRepository {
    private categoriesRepository;
    constructor(categoriesRepository: Repository<Category>);
    getCategories(): Promise<Category[]>;
    addCategories(): Promise<void>;
}
