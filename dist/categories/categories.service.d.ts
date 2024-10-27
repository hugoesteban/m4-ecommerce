import { CategoriesRepository } from './categories.repository';
import { Category } from './category.entity';
export declare class CategoriesService {
    private categoriesRepository;
    constructor(categoriesRepository: CategoriesRepository);
    getCategories(): Promise<Category[]>;
    addCategories(): Promise<string>;
}
