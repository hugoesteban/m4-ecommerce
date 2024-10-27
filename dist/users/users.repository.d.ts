import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './users-update.dto';
import { Order } from 'src/orders/order.entity';
export declare class UsersRepository {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    getUsers(page?: number, limit?: number): Promise<{
        id: string;
        name: string;
        email: string;
        phone: number;
        address: string;
        country: string;
        city: string;
        isAdmin: boolean;
        orders: Order[];
    }[]>;
    getById(id: string): Promise<{
        id: string;
        name: string;
        email: string;
        phone: number;
        address: string;
        country: string;
        city: string;
        isAdmin: boolean;
        orders: Order[];
    }>;
    createUser(user: Partial<User>): Promise<{
        id: string;
        name: string;
        email: string;
        phone: number;
        address: string;
        country: string;
        city: string;
        isAdmin: boolean;
        orders: Order[];
    }>;
    updateUser(id: string, updateUser: UpdateUserDto): Promise<Partial<User>>;
    setAdminRepository(id: string): Promise<void>;
    deleteUser(id: string): Promise<{
        'Usuario Eliminado: ': {
            id: string;
            name: string;
            email: string;
            phone: number;
            address: string;
            country: string;
            city: string;
            isAdmin: boolean;
            orders: Order[];
        };
    }>;
    getUserByEmail(email: string): Promise<User>;
}
