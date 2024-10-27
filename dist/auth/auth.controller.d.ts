import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(credentials: SignInDto): Promise<{
        message: string;
        user: import("../users/user.entity").User;
        token: string;
    }>;
    signUp(user: SignUpDto): Promise<{
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
