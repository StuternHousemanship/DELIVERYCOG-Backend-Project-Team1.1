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
const User_1 = require("../../Models/User");
class Validation {
    constructor() {
        this.validateEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.query().where('email', '=', email);
            if (user.length > 0) {
                return user[0].email;
            }
            return undefined;
        });
        this.validatePhoneNumber = (phoneNumber) => __awaiter(this, void 0, void 0, function* () {
            const userphoneNumber = yield User_1.User.query().where('phone_number', '=', phoneNumber);
            if (userphoneNumber.length > 0) {
                return userphoneNumber[0].phone_number;
            }
            return undefined;
        });
        this.isVerified = (email) => __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.query().where('email', '=', email);
            if (user.is_verified) {
                return true;
            }
            return false;
        });
    }
}
exports.default = Validation;
