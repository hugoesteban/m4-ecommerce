import { User } from 'src/users/user.entity';
import { UsersRepository } from 'src/users/users.repository';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly usersRepository;
    private readonly jwtService;
    constructor(usersRepository: UsersRepository, jwtService: JwtService);
    signIn(email: string, password: string): Promise<{
        message: string;
        user: User;
        token: string;
    }>;
    signUp(user: Partial<User>): Promise<{
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
}
