import express, { Request, Response, NextFunction } from 'express';
import OrderService from '../../Services/Orders/orderService';
const newOrder = new OrderService();

export const createOrder = async (req: Request, res: Response,next: NextFunction) => {
   return await newOrder.createOrders(req, res, next);
};