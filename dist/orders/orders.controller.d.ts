import { OrdersService } from './orders.service';
import { OrderCreateDto } from './ordercreate.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    getAllOrdersByUserController(req: any): Promise<import("./order.entity").Order[]>;
    getOrderByUserController(id: string, req: any): Promise<import("./order.entity").Order>;
    addOrderController(order: OrderCreateDto): Promise<import("./order.entity").Order[]>;
}
