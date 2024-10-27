import { Category } from 'src/categories/category.entity';
import { OrderDetail } from 'src/order-details/order-detail.entity';
export declare class Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    imgUrl: string;
    category: Category;
    orderDetail: OrderDetail[];
}
