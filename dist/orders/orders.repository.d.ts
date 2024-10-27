import { Order } from './order.entity';
import { Repository } from 'typeorm';
import { OrderDetail } from 'src/order-details/order-detail.entity';
import { User } from 'src/users/user.entity';
import { Product } from 'src/products/product.entity';
export declare class OrdersRepository {
    private ordersRepository;
    private orderDetailsRepository;
    private usersRepository;
    private productsRepository;
    constructor(ordersRepository: Repository<Order>, orderDetailsRepository: Repository<OrderDetail>, usersRepository: Repository<User>, productsRepository: Repository<Product>);
    getAllOrdersRepository(userId: string): Promise<Order[]>;
    getOrderByIdRepository(id: string, userId: string): Promise<Order>;
    addOrderRepository(userId: string, products: any): Promise<Order[]>;
}
