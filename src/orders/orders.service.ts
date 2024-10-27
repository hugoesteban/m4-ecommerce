import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { Product } from 'src/products/product.entity';

@Injectable()
export class OrdersService {
  constructor(private OrdersRepository: OrdersRepository) {}

  getAllOrdersService(userId: string) {
    return this.OrdersRepository.getAllOrdersRepository(userId);
  }

  getOrderService(id: string, userId: string) {
    return this.OrdersRepository.getOrderByIdRepository(id, userId);
  }

  addOrderService(userId: string, products: Partial<Product[]>) {
    return this.OrdersRepository.addOrderRepository(userId, products);
  }
}
