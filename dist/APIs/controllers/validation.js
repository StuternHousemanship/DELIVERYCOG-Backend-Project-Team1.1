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
exports.validatePhoneNumber = exports.validateEmail = void 0;
const globalQueries_1 = __importDefault(require("../../models/globalQueries"));
const globalQuery = new globalQueries_1.default();
const validateEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield globalQuery.findOne('users', 'email', email);
    if (user.length > 0) {
        return user[0].email;
    }
    return undefined;
});
exports.validateEmail = validateEmail;
const validatePhoneNumber = (phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const userphoneNumber = yield globalQuery.findOne('users', 'phone_number', phoneNumber);
    if (userphoneNumber.length > 0) {
        return userphoneNumber[0].phone_number;
    }
    return undefined;
});
exports.validatePhoneNumber = validatePhoneNumber;
