import { UsersService } from './users.service';
import { UpdateUserDto } from './users-update.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAllUsersController(page: number, limit: number): Promise<{
        id: string;
        name: string;
        email: string;
        phone: number;
        address: string;
        country: string;
        city: string;
        isAdmin: boolean;
        orders: import("../orders/order.entity").Order[];
    }[]>;
    findOneUsersController(id: string): Promise<{
        id: string;
        name: string;
        email: string;
        phone: number;
        address: string;
        country: string;
        city: string;
        isAdmin: boolean;
        orders: import("../orders/order.entity").Order[];
    }>;
    updateUsersController(id: string, updateUser: UpdateUserDto): Promise<Partial<import("./user.entity").User>>;
    setAdminController(id: string): Promise<void>;
    deleteUsersController(id: string): Promise<{
        'Usuario Eliminado: ': {
            id: string;
            name: string;
            email: string;
            phone: number;
            address: string;
            country: string;
            city: string;
            isAdmin: boolean;
            orders: import("../orders/order.entity").Order[];
        };
    }>;
}
