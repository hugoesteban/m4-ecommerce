"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToLowerCaseInterceptor = void 0;
const common_1 = require("@nestjs/common");
let ToLowerCaseInterceptor = class ToLowerCaseInterceptor {
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const data = request.body;
        if (data && typeof data.email === 'string') {
            data.email = data.email.toLowerCase();
        }
        return next.handle();
    }
};
exports.ToLowerCaseInterceptor = ToLowerCaseInterceptor;
exports.ToLowerCaseInterceptor = ToLowerCaseInterceptor = __decorate([
    (0, common_1.Injectable)()
], ToLowerCaseInterceptor);
//# sourceMappingURL=to-lower-case.interceptor.js.map