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
// import dotenv
const dotenv_1 = __importDefault(require("dotenv"));
// import express
const express_1 = __importDefault(require("express"));
const Routes_1 = __importDefault(require("./V1/APIs/Routes"));
const appError_1 = require("./V1/APIs/Utilities/Errors/appError");
const errorHandler_1 = __importDefault(require("./V1/APIs/Utilities/Errors/errorHandler"));
const dbSetup_1 = __importDefault(require("./V1/APIs/Config/db/dbSetup"));
dotenv_1.default.config({ path: './src/V1/APIs/Config/.env' });
// Initialize express
const app = (0, express_1.default)();
// Bind all Models to a knex instance.
(0, dbSetup_1.default)();
// Port
const PORT = Number(process.env.PORT) || 3000;
const address = `0.0.0.0:${PORT}`;
// Body parser middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Define index route
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.contentType('json');
    res.json({ status: 'ok', message: 'Welcome to DeliveryCog' });
}));
// Routes
app.use('/api/v1', Routes_1.default);
app.all('*', (req, res, next) => {
    next(new appError_1.AppError(`can't find ${req.originalUrl} on server!`, 404));
});
app.use(errorHandler_1.default);
// Listen for server connections
const server = app.listen(PORT, () => console.log(`server running on ${address}`));
exports.default = server;
