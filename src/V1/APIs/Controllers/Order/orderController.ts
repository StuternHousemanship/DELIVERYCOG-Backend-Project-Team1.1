import express, { Request, Response, NextFunction } from 'express';
import OrderService from '../../Services/Orders/orderService';

const orderService = new OrderService();

export default class orderController {
   public async createOrder(req: Request, res: Response, next: NextFunction) {
      return orderService.createOrders(req, res, next)
   };

   public async getAllOrder(req: Request, res: Response, next: NextFunction) {
      return orderService.getAllOrder(req, res, next);
   };
   
   public async getOrderById(req: Request, res: Response, next: NextFunction) {
      return orderService.getOrderById(req, res, next);
   };
}



