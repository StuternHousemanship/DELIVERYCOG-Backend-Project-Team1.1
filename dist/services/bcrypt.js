"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secret = exports.saltRound = exports.pepper = void 0;
require("dotenv/config");
exports.pepper = process.env.BCRYPT_PASSWORD;
exports.saltRound = parseInt(process.env.SALT_ROUNDS, 10);
exports.secret = process.env.SECRET;
