"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
const objection_1 = require("objection");
class Orders extends objection_1.Model {
    static get tableName() {
        return 'orders';
    }
}
exports.Orders = Orders;
;
