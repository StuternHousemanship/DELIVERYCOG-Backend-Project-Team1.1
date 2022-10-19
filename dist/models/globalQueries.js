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
const Connection_1 = __importDefault(require("../config/db/Connection"));
class GlobalQueries {
    findOne(table, column, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield Connection_1.default.client.connect();
            const sql = `SELECT * FROM ${table} WHERE ${column}='${value}' ORDER BY id DESC`;
            const res = yield conn.query(sql);
            conn.release();
            return res.rows;
        });
    }
    updateOne(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield Connection_1.default.client.connect();
            const sql = `UPDATE ${obj.table} SET ${obj.setColumn}='${obj.setValue}' WHERE ${obj.uniqueColumn}='${obj.uniqueValue}' RETURNING *`;
            const res = yield conn.query(sql);
            conn.release();
            return res.rows;
        });
    }
}
exports.default = GlobalQueries;
