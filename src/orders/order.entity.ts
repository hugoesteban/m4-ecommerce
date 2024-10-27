import { OrderDetail } from 'src/order-details/order-detail.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default: new Date(),
    type: 'date',
  })
  date: Date;

  @ManyToOne(() => User, (user) => user.orders, {
    onDelete: 'CASCADE', // Si se elimina el usuario, se eliminan las órdenes
  })
  user: User;

  @OneToOne(() => OrderDetail, {
    cascade: true, // El detalle de la orden se elimina junto con la orden
    onDelete: 'CASCADE', // Si se elimina la orden, se elimina el detalle
  })
  @JoinColumn()
  orderDetail: OrderDetail;
}

// constructor(id: string, date: Date, user: User, products: Product[]) {
//   this.id = id;
//   this.date = date;
//   this.user = user;
//   this.products = products;
