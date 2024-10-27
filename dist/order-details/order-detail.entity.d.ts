import { Product } from 'src/products/product.entity';
import { Order } from 'src/orders/order.entity';
export declare class OrderDetail {
    id: string;
    price: number;
    order: Order;
    products: Product[];
}
