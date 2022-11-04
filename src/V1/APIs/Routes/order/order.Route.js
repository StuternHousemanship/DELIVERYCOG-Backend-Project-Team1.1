import { Router } from 'express';
import orderController  from "../../Controllers/Order/orderController";
export const order = Router();

const order = new orderController();

order.post('/create-order', order.createOrder);
order.post('/getAllOrder', order.fetchAllOrder);

