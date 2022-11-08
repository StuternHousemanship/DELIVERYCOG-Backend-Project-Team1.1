import { express } from 'express';
import { Router } from 'express';
import orderController  from "../../Controllers/Order/orderController";
import { Orders, OrderType } from '../../Models/orders';
export const order = Router();

const order = new orderController();

order.post('/create-order', order.createOrder);
order.get('/order/getAllOrder', order.fetchAllOrder);
order.get('/order/:id', order.fetchOrderById);

