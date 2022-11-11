import express, { Request, Response, NextFunction } from 'express';
import OrderService from '../../Services/Orders/orderService';
const newOrder = new OrderService();

export default class orderController {
   public async createOrder(req: Request, res: Response, next: NextFunction) {
   return newOrder.createOrders(req, res, next)
};
   public async fetchAllOrder(req: Request, res: Response, next: NextFunction)  {
   return newOrder.getAllOrder (req, res, next);
};
   public async fetchOrderById(req: Request, res: Response, next: NextFunction) {
      return newOrder.getOrderById(req, res, next);
   };  
}



