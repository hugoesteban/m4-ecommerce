import { OrdersRepository } from './orders.repository';
import { Product } from 'src/products/product.entity';
export declare class OrdersService {
    private OrdersRepository;
    constructor(OrdersRepository: OrdersRepository);
    getAllOrdersService(userId: string): Promise<import("./order.entity").Order[]>;
    getOrderService(id: string, userId: string): Promise<import("./order.entity").Order>;
    addOrderService(userId: string, products: Partial<Product[]>): Promise<import("./order.entity").Order[]>;
}
