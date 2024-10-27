import { UsersRepository } from './users.repository';
import { User } from './user.entity';
import { ConfigService } from '@nestjs/config';
import { UpdateUserDto } from './users-update.dto';
export declare class UsersService {
    private readonly usersRepository;
    private configService;
    constructor(usersRepository: UsersRepository, configService: ConfigService);
    findAllUsersService(page: number, limit: number): Promise<{
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
    findOneUsersService(id: string): Promise<{
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
    updateUsersService(id: string, updateUser: UpdateUserDto): Promise<Partial<User>>;
    setAdminService(id: string): Promise<void>;
    deleteUsersService(id: string): Promise<{
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
