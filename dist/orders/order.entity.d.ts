import { OrderDetail } from 'src/order-details/order-detail.entity';
import { User } from 'src/users/user.entity';
export declare class Order {
    id: string;
    date: Date;
    user: User;
    orderDetail: OrderDetail;
}
