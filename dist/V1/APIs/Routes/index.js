"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_router_1 = __importDefault(require("./auth/auth.router"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_config_1 = __importDefault(require("../Docs/swagger.config"));
const router = (0, express_1.Router)();
router.use('/auth', auth_router_1.default);
router.use('/documentation', swagger_ui_express_1.default.serve);
router.use('/documentation', swagger_ui_express_1.default.setup(swagger_config_1.default));
exports.default = router;
