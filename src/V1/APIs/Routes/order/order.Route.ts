import { Router } from 'express';
import orderController  from "../../Controllers/Order/orderController";
import { Orders, OrderType } from '../../Models/orders';
const order = Router();

const orders = new orderController();

order.post('/create-order', orders.createOrder);
order.get('/order/getAllOrder', orders.fetchAllOrder);
order.get('/order/:id', orders.fetchOrderById);

