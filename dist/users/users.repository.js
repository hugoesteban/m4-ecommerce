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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
const typeorm_2 = require("typeorm");
let UsersRepository = class UsersRepository {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async getUsers(page = 1, limit = 5) {
        const users = await this.usersRepository.find({
            skip: (page - 1) * limit,
            take: limit,
        });
        return users.map(({ password, ...userSinPassword }) => userSinPassword);
    }
    async getById(id) {
        const user = await this.usersRepository.findOne({
            where: { id },
            relations: { orders: true },
        });
        if (!user)
            throw new common_1.NotFoundException(`User id: ${id} not found`);
        const { password, ...userSinPassword } = user;
        return userSinPassword;
    }
    async createUser(user) {
        try {
            const newUser = await this.usersRepository.save(user);
            console.log('newUser: ', newUser);
            const dbUser = await this.usersRepository.findOneBy({ id: newUser.id });
            const { password, ...userSinPassword } = dbUser;
            return userSinPassword;
        }
        catch (err) {
            throw new Error('Error al crear el usuario');
        }
    }
    async updateUser(id, updateUser) {
        const userFound = await this.usersRepository.findOneBy({ id });
        if (!userFound)
            throw new common_1.NotFoundException('User not found');
        Object.assign(userFound, updateUser);
        const dbUser = await this.usersRepository.save(userFound);
        const { password, ...userSinPassword } = dbUser;
        return userSinPassword;
    }
    async setAdminRepository(id) {
        const userFound = await this.usersRepository.findOneBy({ id });
        if (!userFound)
            throw new common_1.NotFoundException('User not found');
        await this.usersRepository.update({ id }, { isAdmin: true });
        return;
    }
    async deleteUser(id) {
        const user = await this.usersRepository.findOneBy({ id });
        if (!user)
            throw new Error('User not found');
        console.log('En repository antes de remove. User: ', user);
        await this.usersRepository.remove(user);
        console.log('En repository despues de remove. User: ', user);
        const { password, ...userSinPassword } = user;
        return { 'Usuario Eliminado: ': userSinPassword };
    }
    async getUserByEmail(email) {
        try {
            const user = await this.usersRepository.findOneBy({ email });
            return user;
        }
        catch (err) {
            throw new Error('En getUserByEmail: ' + err.message);
        }
    }
};
exports.UsersRepository = UsersRepository;
exports.UsersRepository = UsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersRepository);
//# sourceMappingURL=users.repository.js.map