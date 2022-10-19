"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = require("../../controllers/AUTH/authentication");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const validation_1 = require("../validation");
const authRoutes = (app) => {
    app.post('/api/v1/auth/register', (0, validation_1.registerValidationRules)(), validateRequest_1.default, authentication_1.create);
    app.post('/api/v1/auth/account-activation', (0, validation_1.otpValidationRules)(), authentication_1.activateAccount);
};
exports.default = authRoutes;
