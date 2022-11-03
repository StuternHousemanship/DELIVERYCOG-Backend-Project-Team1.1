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
const dotenv_1 = __importDefault(require("dotenv"));
const orderRepository_1 = __importDefault(require("../../Repository/orderRepository"));
const orderRepository = new orderRepository_1.default();
dotenv_1.default.config({ path: './src/V1/APIs/Config/.env' });
class OrderService {
    createOrders(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // const { packageName, destination, recieverName, recieverNumber } = req.body
            //     req.body;
            try {
                const orderDetails = {
                    package_name: req.body.packageName,
                    destination: req.body.destination,
                    reciever_name: req.body.recieverName,
                    reciever_number: req.body.recieverNumber,
                };
                yield orderRepository.createOrder(orderDetails);
                return res.status(201).json({
                    success: true,
                    message: 'Delivery order created succesfully!',
                });
            }
            catch (error) {
                return res.status(400).json({
                    success: false,
                    message: 'Oops! Unable to create order, please try again'
                });
            }
        });
    }
}
exports.default = OrderService;
;
