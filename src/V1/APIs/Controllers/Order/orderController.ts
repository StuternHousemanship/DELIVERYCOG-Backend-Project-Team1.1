import express, { Request, Response, NextFunction } from 'express';
import OrderService from '../../Services/Orders/orderService';
import { Orders, OrderType } from '../../Models/orders';
const newOrder = new OrderService();

export default class orderController {
   public async createOrder(req: Request, res: Response, next: NextFunction) {
   return await newOrder.createOrders(req, res, next)
};
   public async fetchAllOrder(req: Request, res: Response, next: NextFunction)  {
   return await newOrder.getAllOrder(req, res, next);
}
}
// export const createOrder = async (req: Request, res: Response,next: NextFunction) => {
//    return await newOrder.createOrders(req, res, next);
// };
// export const fetchAllOrder = async (req: Request, res: Response, next: NextFunction) => {
//    return await newOrder.getAllOrder(req, res, next);
// }

