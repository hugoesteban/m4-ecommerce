"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsRepository = void 0;
const common_1 = require("@nestjs/common");
const product_entity_1 = require("./product.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const data = require("../utils/data.json");
const category_entity_1 = require("../categories/category.entity");
let ProductsRepository = class ProductsRepository {
    constructor(productsRepository, categoriesRepository) {
        this.productsRepository = productsRepository;
        this.categoriesRepository = categoriesRepository;
    }
    async findAll(page = 1, limit = 5) {
        const products = await this.productsRepository.find({
            relations: { category: true },
        });
        let productosConStock = products.filter((product) => product.stock > 0);
        const start = (page - 1) * limit;
        const end = start + limit;
        productosConStock = productosConStock.slice(start, end);
        return productosConStock;
    }
    async findOne(id) {
        const product = await this.productsRepository.findOne({
            where: { id },
            relations: { category: true },
        });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        return product;
    }
    async addProducts() {
        const categories = await this.categoriesRepository.find();
        if (data)
            for (const product of data) {
                const category = categories.find((category) => category.name === product.category);
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
                    .into(product_entity_1.Product)
                    .values(newProduct)
                    .orUpdate(['description', 'price', 'stock', 'imgUrl'], ['name'])
                    .execute();
            }
        else
            throw new common_1.NotFoundException('Products not found. File Data exists?');
    }
    async saveProduct(newProduct) {
        const productCreated = this.productsRepository.create(newProduct);
        const productSaved = await this.productsRepository.save(productCreated);
        return productSaved;
    }
    async updateProduct(id, updateProduct) {
        const productFound = await this.productsRepository.findOneBy({ id });
        if (!productFound)
            throw new common_1.NotFoundException('Product not found');
        Object.assign(productFound, updateProduct);
        return await this.productsRepository.save(productFound);
    }
    async deleteProduct(id) {
        const deleteResult = await this.productsRepository.delete(id);
        if (deleteResult.affected === 0) {
            throw new common_1.NotFoundException('Product not found');
        }
        return id;
    }
};
exports.ProductsRepository = ProductsRepository;
exports.ProductsRepository = ProductsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductsRepository);
//# sourceMappingURL=products.repository.js.map