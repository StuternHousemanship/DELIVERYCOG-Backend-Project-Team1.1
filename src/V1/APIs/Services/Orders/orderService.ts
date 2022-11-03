import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { OrderType, Orders } from '../../Models/orders';

import OrderRepository from '../../Repository/orderRepository';
import { userInfo } from 'os';
const orderRepository = new OrderRepository();

dotenv.config({ path: './src/V1/APIs/Config/.env' });

export default class OrderService {
    public async createOrders (req: Request, res: Response, next: NextFunction) {
           // const { packageName, destination, recieverName, recieverNumber } = req.body
            //     req.body;
        try {
            const orderDetails = {
                package_name: req.body.packageName,
                destination: req.body.destination,
                reciever_name: req.body.recieverName,
                reciever_number: req.body.recieverNumber,
        }

                 await orderRepository.createOrder(orderDetails)
        return res.status(201).json({
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
    };
