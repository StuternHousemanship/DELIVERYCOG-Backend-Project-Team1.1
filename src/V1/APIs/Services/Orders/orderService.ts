import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { User, Orders, OrderType, UserType } from '../../Models/User';
import OrderRepository from '../../Repository/Order/orderRepository';
const orderRepository = new OrderRepository();

dotenv.config({ path: './src/V1/APIs/Config/.env' });

export default class OrderService { 
    // Here is the logics for logged in user to creating new order
    public async createOrders(req: Request, res: Response, next: NextFunction)  {
        try {
             const orderDetails = await orderRepository.createOrder({
                item : req.body.item,
                destination: req.body.destination,
                reciever_name: req.body.recieverName,
                reciever_number: req.body.recieverNumber})
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
                 message: 'Something went wrong! Unable to create order'
             })
        }};
// Here is the logic for fetching all orders from database 
    public async getAllOrder(req: Request, res: Response, next: NextFunction) {
        try{ 
            
            const getAllOrders: any = await Orders.query().then(rows => rows) 
        return getAllOrders;
    }
catch (error) {
    return res.status(400).json({
        success: false,
        message: 'Oops! Something went wrong!, please try again'
    })
}  
     };
// Here is the logic to get order by id
    public async getOrderById(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id
        const getOrderById: any = await Orders.query().findById(id)
        return getOrderById;
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: `Sorry! Order id ${req.params.id} does not exist` 
        })
    }
};}; 

