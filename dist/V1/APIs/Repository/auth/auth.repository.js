"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("../../Utilities/bcrypt");
const User_1 = require("../../Models/User");
class AuthRepository {
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashPassword = yield new bcrypt_1.Encryption().bcrypt(user.password_digest);
            const newUser = yield User_1.User.query().insert({
                first_name: user.first_name,
                last_name: user.last_name,
                password_digest: hashPassword,
                phone_number: user.phone_number,
                email: user.email,
                verification_code: user.verification_code,
            });
            return newUser;
        });
    }
    authenticate(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.query().where('email', '=', email);
            const checkPassword = yield new bcrypt_1.Encryption().compare(password, user[0].password_digest);
            if (!checkPassword) {
                return undefined;
            }
            return user;
        });
    }
}
exports.default = AuthRepository;
