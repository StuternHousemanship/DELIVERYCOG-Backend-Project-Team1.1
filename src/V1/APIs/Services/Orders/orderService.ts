import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { Orders, OrderType } from '../../Models/order.model';
import OrderRepository from '../../Repository/Order/orderRepository';
import { response } from '../../Utilities/response';

const orderRepository = new OrderRepository();

dotenv.config({ path: './src/V1/APIs/Config/.env' });

export default class OrderService {
    // Here is the logics for logged in user to creating new order
    public async createOrders(req: Request, res: Response, next: NextFunction) {
        try {
            const { item, destination, sender_name, sender_number, reciever_name, reciever_number } = req.body

            const order = await orderRepository.createOrder({
                userId: req.user.id,
                item: item,
                destination: destination,
                sender_name: sender_name,
                sender_number: sender_number,
                reciever_name: reciever_name,
                reciever_number: reciever_number
            })


            if (!order) {
                return res.status(500).json(response({
                    success: false, message: "Failed to create order"
                }))
            }
            return res.status(201).json({

                success: true,
                message:
                    'Delivery order created succesfully!', 
                    order
            });
        }
        catch (error) {
            console.log((error as Error).message);
            return res.status(500).json({
                success: false,
                message: (error as Error).message

            })
        }
    };
    // Here is the logic for fetching all orders from database 
    public async getAllOrder(req: Request, res: Response, next: NextFunction) {
        try {

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
    };
};

