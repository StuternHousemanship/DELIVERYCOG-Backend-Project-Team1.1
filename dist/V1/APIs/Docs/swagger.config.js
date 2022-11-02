"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_docs_1 = __importDefault(require("./auth.docs"));
const swaggerDocumentation = {
    openapi: '3.0.3',
    info: {
        title: 'Swagger DYC - OpenAPI 3.0',
        version: '0.0.1',
        description: 'DYC Documentations',
    },
    servers: [
        {
            url: 'http://localhost:8000',
            description: 'Local dev',
        },
        {
            url: 'http://production',
            description: 'Production dev',
        },
    ],
    tags: [
        {
            name: 'Authentication',
            description: 'Authentication Routes',
        },
    ],
    paths: Object.assign({}, auth_docs_1.default),
};
exports.default = swaggerDocumentation;
