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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const Connection_1 = __importDefault(require("../../config/db/Connection"));
const bcrypt_2 = require("../bcrypt");
const globalQueries_1 = __importDefault(require("../../Repository/globalQueries"));
const globalQuery = new globalQueries_1.default();
class AuthService {
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield Connection_1.default.client.connect();
            const sql = 'INSERT INTO users (first_name, last_name, password_digest, phone_number, email,verification_code) VALUES($1, $2, $3, $4, $5,$6) RETURNING * ';
            const hashPassword = yield bcrypt_1.default.hash(user.password_digest + bcrypt_2.pepper, bcrypt_2.saltRound);
            const result = yield conn.query(sql, [
                user.first_name,
                user.last_name,
                hashPassword,
                user.phone_number,
                user.email,
                user.verification_code,
            ]);
            conn.release();
            return result.rows;
        });
    }
    forgotpassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const code = crypto_1.default.randomInt(100000, 1000000);
            const encryptedCode = yield bcrypt_1.default.hash(code + bcrypt_2.pepper, bcrypt_2.saltRound);
            const forgot = yield globalQuery.updateOne({
                model: 'users',
                table: 'verification_code',
                value: code,
                uniqueColumn: 'email',
                uniqueValue: email,
            });
            console.log(forgot[0].verification_code);
            return forgot.length > 0 ? forgot : false;
        });
    }
}
exports.default = AuthService;
