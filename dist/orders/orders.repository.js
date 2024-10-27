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
exports.OrdersRepository = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const order_entity_1 = require("./order.entity");
const typeorm_2 = require("typeorm");
const order_detail_entity_1 = require("../order-details/order-detail.entity");
const user_entity_1 = require("../users/user.entity");
const product_entity_1 = require("../products/product.entity");
const common_1 = require("@nestjs/common");
let OrdersRepository = class OrdersRepository {
    constructor(ordersRepository, orderDetailsRepository, usersRepository, productsRepository) {
        this.ordersRepository = ordersRepository;
        this.orderDetailsRepository = orderDetailsRepository;
        this.usersRepository = usersRepository;
        this.productsRepository = productsRepository;
    }
    async getAllOrdersRepository(userId) {
        return await this.ordersRepository.find({
            where: { user: { id: userId } },
            relations: ['user', 'orderDetail'],
        });
    }
    async getOrderByIdRepository(id, userId) {
        const order = await this.ordersRepository.findOne({
            where: {
                id,
                user: { id: userId },
            },
            relations: {
                orderDetail: {
                    products: true,
                },
            },
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order id ${id} no encontrado`);
        }
        return order;
    }
    async addOrderRepository(userId, products) {
        let total = 0;
        const user = await this.usersRepository.findOneBy({ id: userId });
        if (!user) {
            throw new common_1.NotFoundException(`User id: ${userId} not found`);
        }
        const order = new order_entity_1.Order();
        order.date = new Date();
        order.user = user;
        const newOrder = await this.ordersRepository.save(order);
        const productsArray = await Promise.all(products.map(async (element) => {
            const product = await this.productsRepository.findOneBy({
                id: element.id,
            });
            if (!product) {
                throw new common_1.NotFoundException(`Product id ${element.id} no encontrado`);
            }
            if (product.stock < 1) {
                throw new common_1.BadRequestException(`Product id ${element.id} no tiene stock suficiente`);
            }
            total += Number(product.price);
            await this.productsRepository.update({ id: element.id }, { stock: --product.stock });
            return product;
        }));
        const orderDetail = new order_detail_entity_1.OrderDetail();
        orderDetail.price = Number(Number(total).toFixed(2));
        orderDetail.order = newOrder;
        orderDetail.products = productsArray;
        await this.orderDetailsRepository.save(orderDetail);
        return await this.ordersRepository.find({
            where: { id: newOrder.id },
            relations: { orderDetail: true },
        });
    }
};
exports.OrdersRepository = OrdersRepository;
exports.OrdersRepository = OrdersRepository = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(order_detail_entity_1.OrderDetail)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrdersRepository);
//# sourceMappingURL=orders.repository.js.map