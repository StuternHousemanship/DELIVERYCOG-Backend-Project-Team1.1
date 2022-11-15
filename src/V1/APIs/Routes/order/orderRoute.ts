import { Router } from 'express';
import orderController from "../../Controllers/Order/orderController";
import { validate } from '../../Middlewares/validateRequest.middleware';
import { createOrderValidationRules } from '../../Utilities/Validations/order.validation';

import { verifyToken } from '../../Middlewares/verifyToken.middleware';

const order = Router();

const orders = new orderController();

order.post('/', verifyToken, createOrderValidationRules(), validate, orders.createOrder);

order.get('/all', verifyToken, orders.getAllOrder);

order.get('/:orderId', verifyToken, orders.getOrderById);

export default order;
