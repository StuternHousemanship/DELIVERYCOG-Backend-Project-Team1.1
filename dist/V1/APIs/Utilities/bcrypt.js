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
exports.Encryption = void 0;
require("dotenv/config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = require("jsonwebtoken");
class Encryption {
    constructor() {
        this.pepper = String(process.env.BCRYPT_PASSWORD);
        this.saltRound = Number(process.env.SALT_ROUNDS);
        this.secret = String(process.env.SECRET);
        this.bcrypt = (str) => __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default.hash(str + this.pepper, this.saltRound);
        });
        this.generateAccessToken = (user) => __awaiter(this, void 0, void 0, function* () {
            const data = {
                user_id: user[0].id,
                email: user[0].email,
            };
            return (0, jsonwebtoken_1.sign)(data, this.secret, { expiresIn: '7d' });
        });
        this.compare = (compare, against) => __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default.compare(compare + this.pepper, against);
        });
    }
}
exports.Encryption = Encryption;
exports.default = new Encryption();
