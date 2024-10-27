import { Order } from 'src/orders/order.entity';
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: number;
    address: string;
    country: string;
    city: string;
    isAdmin: boolean;
    orders: Order[];
}
