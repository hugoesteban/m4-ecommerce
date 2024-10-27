"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_repository_1 = require("../users/users.repository");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(usersRepository, jwtService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
    }
    async signIn(email, password) {
        const foundUser = await this.usersRepository.getUserByEmail(email);
        if (!foundUser)
            throw new common_1.BadRequestException('Email o contraseña incorrecta');
        const isPasswordValid = await bcrypt.compare(password, foundUser.password);
        if (!isPasswordValid)
            throw new common_1.BadRequestException('Email o contraseña incorrecta');
        const payload = {
            id: foundUser.id,
            email: foundUser.email,
            isAdmin: foundUser.isAdmin,
        };
        const token = this.jwtService.sign(payload);
        return {
            message: 'Usuario logueado',
            user: foundUser,
            token: token,
        };
    }
    async signUp(user) {
        console.log('En signUp Service');
        const { email, password } = user;
        const foundUser = await this.usersRepository.getUserByEmail(email);
        if (foundUser)
            throw new common_1.BadRequestException('El mail ya existe');
        console.log('El usuario no existe, se puede registrar');
        const hashedPassword = await bcrypt.hash(password, 10);
        if (!hashedPassword)
            throw new common_1.BadRequestException('Error al hashear la contraseña');
        console.log('Se ha hasheado la contraseña');
        console.log('Antes de crear usuario:');
        console.log(user);
        const newUser = await this.usersRepository.createUser({
            ...user,
            password: hashedPassword,
        });
        console.log('Se creó nuevo usuario');
        console.log('Usuario de BD: ', newUser);
        return newUser;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map