"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("../knexfile"));
const objection_1 = require("objection");
const setupDb = () => {
    const db = (0, knex_1.default)(knexfile_1.default.development);
    objection_1.Model.knex(db);
};
exports.default = setupDb;
