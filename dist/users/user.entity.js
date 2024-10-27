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
exports.User = void 0;
const openapi = require("@nestjs/swagger");
const order_entity_1 = require("../orders/order.entity");
const typeorm_1 = require("typeorm");
let User = class User {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, email: { required: true, type: () => String }, password: { required: true, type: () => String }, phone: { required: true, type: () => Number }, address: { required: true, type: () => String }, country: { required: true, type: () => String }, city: { required: true, type: () => String }, isAdmin: { required: true, type: () => Boolean }, orders: { required: true, type: () => [require("../orders/order.entity").Order] } };
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 80,
        nullable: false,
    }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        unique: true,
        nullable: false,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        nullable: false,
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
    }),
    __metadata("design:type", Number)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
    }),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 20,
    }),
    __metadata("design:type", String)
], User.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 20,
    }),
    __metadata("design:type", String)
], User.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        default: false,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isAdmin", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_entity_1.Order, (order) => order.user, {
        cascade: true,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], User.prototype, "orders", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
//# sourceMappingURL=user.entity.js.map