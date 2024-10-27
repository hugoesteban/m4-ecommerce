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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDtoUpdate = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ProductDtoUpdate {
}
exports.ProductDtoUpdate = ProductDtoUpdate;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3, { message: 'El nombre debe tener al menos 3 caracteres' }),
    (0, class_validator_1.MaxLength)(100, { message: 'El nombre no debe superar los 100 caracteres' }),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Product name',
        example: 'Update Product',
    }),
    __metadata("design:type", String)
], ProductDtoUpdate.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5, { message: 'La descripción debe tener al menos 5 caracteres' }),
    (0, class_validator_1.MaxLength)(500, {
        message: 'La descripción no debe superar los 500 caracteres',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Product description ',
        example: 'This is a Update product',
    }),
    __metadata("design:type", String)
], ProductDtoUpdate.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0, { message: 'El precio debe ser al menos 0' }),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Product price',
        example: 1000,
    }),
    __metadata("design:type", Number)
], ProductDtoUpdate.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0, { message: 'El stock debe ser al menos 0' }),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Product stock',
        example: 10,
    }),
    __metadata("design:type", Number)
], ProductDtoUpdate.prototype, "stock", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3, { message: 'La categoría debe tener al menos 3 caracteres' }),
    (0, class_validator_1.MaxLength)(50, { message: 'La categoría no debe superar los 50 caracteres' }),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Product category, must exists in categories',
        example: 'smartphone',
    }),
    __metadata("design:type", String)
], ProductDtoUpdate.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsUrl)({}, { message: 'La URL de la imagen debe ser válida' }),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Product image url',
        example: 'https://example.com/image.png',
    }),
    __metadata("design:type", String)
], ProductDtoUpdate.prototype, "imgUrl", void 0);
//# sourceMappingURL=product.dto.update.js.map