import { Router } from 'express';
import orderController from "../../Controllers/Order/orderController";
import { validate } from '../../Middlewares/validateRequest.middleware';
import { createOrderValidationRules } from '../../Utilities/Validations/order.validation';

import { verifyToken } from '../../Middlewares/verifyToken.middleware';

const order = Router();

const orders = new orderController();

//Defining swagger schema documentation for orders
/**
* @swagger
*  components:
*     schema:
*        task:
*            type: object
*            properties:
*                 item:
*                     type: string
*                 destination:
*                     type: string
*                 recieverName:
*                     type: string
*                 recieverNumber:
*                     type: integer
*/

// swagger doucumentation of task post api route
/**
 * @swagger
 * /tasks:
 *  post:
 *     description: this api creates order for a logged in user    
 *     responses:
 *      '200':
 *        description: Delivery order created successfully          
 */
order.post('/', verifyToken, createOrderValidationRules(), validate, orders.createOrder);

/**
  * @swagger
  * /tasks:
  *  get:
  *     summary: To get all orders created by a user in rows
  *     description: use to get all order 
  *     responses: 
  *         200:
  *             description: order details          
  */
order.get('/all', verifyToken, orders.getAllOrder);

/**
  * @swagger
  * /tasks:
  *  get:
  *     summary: To get an order by id
  *     description: use to get a single order  
  *     responses: 
  *         200:
  *             description: order details          
  */
order.get('/:orderId', verifyToken, orders.getOrderById);

export default order;
