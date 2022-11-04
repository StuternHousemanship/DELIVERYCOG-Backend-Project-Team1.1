import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { Orders, OrderType } from '../../Models/orders';
import OrderRepository from '../../Repository/Order/orderRepository';
const orderRepository = new OrderRepository();

dotenv.config({ path: './src/V1/APIs/Config/.env' });

export default class OrderService {
    // Here is the logics for creating new order
    public async createOrders (req: Request, res: Response, next: NextFunction) {
           
        try {
            const orderDetails = await orderRepository.createOrder({
                package_name: req.body.packageName,
                destination: req.body.destination,
                reciever_name: req.body.recieverName,
                reciever_number: req.body.recieverNumber,
        })

         //await orderRepository.createOrder(orderDetails)
        return res.status(201).json({
            orderDetails,
            success: true,
            message:
                'Delivery order created succesfully!',
        }); 
    }
        catch (error) {
             return res.status(400).json({
                 success: false,
                 message: 'Oops! Unable to create order, please try again'
             })
        }}
// Here is the logic for fetching all orders from database 
    public async getAllOrder(req: Request, res: Response, next: NextFunction) {
        const getAllOrders: any = await Orders.query()
        return getAllOrders;
    }
    };
