import { Product } from 'src/products/product.entity';
import { Order } from 'src/orders/order.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price: number;

  @OneToOne(() => Order, (order) => order.orderDetail, {
    onDelete: 'CASCADE',
  })
  order: Order;

  @ManyToMany(() => Product, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'order_detail-product' })
  products: Product[];
}
