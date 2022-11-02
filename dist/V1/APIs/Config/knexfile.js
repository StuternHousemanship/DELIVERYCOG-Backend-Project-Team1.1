"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// Update with your config settings.
const objection_1 = require("objection");
dotenv_1.default.config({ path: '.env' });
console.log(__dirname + '/db/seeds');
const config = {
    development: Object.assign({ client: 'postgresql', connection: {
            database: `${process.env.POSTGRES_DB}`,
            user: `${process.env.POSTGRES_USER}`,
            password: `${process.env.POSTGRES_PASSWORD}`,
        }, pool: {
            min: 2,
            max: 10,
        }, migrations: {
            tableName: 'knex_migrations',
        }, seeds: {
            directory: __dirname + '/db/seeds'
        } }, objection_1.knexSnakeCaseMappers),
    production: Object.assign({ client: 'postgresql', connection: {
            database: `${process.env.POSTGRES_DB}`,
            user: `${process.env.POSTGRES_USER}`,
            password: `${process.env.POSTGRES_PASSWORD}`,
        }, pool: {
            min: 2,
            max: 10,
        }, migrations: {
            tableName: 'knex_migrations',
        }, seeds: {
            directory: __dirname + '/db/seeds'
        } }, objection_1.knexSnakeCaseMappers),
};
exports.default = config;
