import { Router } from 'express';
import orderController  from "../../Controllers/Order/orderController";
const order = Router();

const orders = new orderController();

order.post('/create-order', orders.createOrder);
order.get('/getAllOrder', orders.fetchAllOrder);
order.get('/:id', orders.fetchOrderById);

export default order;
