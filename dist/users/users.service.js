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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_repository_1 = require("./users.repository");
const config_1 = require("@nestjs/config");
let UsersService = class UsersService {
    constructor(usersRepository, configService) {
        this.usersRepository = usersRepository;
        this.configService = configService;
        const dbHost = this.configService.get('DB_HOST');
        console.log(`dbHost in users.service: ${dbHost}`);
    }
    async findAllUsersService(page, limit) {
        return this.usersRepository.getUsers(page, limit);
    }
    async findOneUsersService(id) {
        const user = this.usersRepository.getById(id);
        return user;
    }
    async updateUsersService(id, updateUser) {
        return this.usersRepository.updateUser(id, updateUser);
    }
    setAdminService(id) {
        return this.usersRepository.setAdminRepository(id);
    }
    async deleteUsersService(id) {
        console.log('En el service. id de User: ', id);
        return this.usersRepository.deleteUser(id);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository,
        config_1.ConfigService])
], UsersService);
//# sourceMappingURL=users.service.js.map