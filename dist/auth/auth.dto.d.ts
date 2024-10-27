export declare class SignUpDto {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    address: string;
    phone: number;
    country: string;
    city: string;
    isAdmin?: boolean;
}
declare const SignInDto_base: import("@nestjs/common").Type<Pick<SignUpDto, "email" | "password">>;
export declare class SignInDto extends SignInDto_base {
}
export {};
