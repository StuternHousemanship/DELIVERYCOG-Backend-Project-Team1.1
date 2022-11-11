import { Router } from 'express';
import orderController  from "../../Controllers/Order/orderController";
import { validate } from '../../Middlewares/validateRequest.middleware';


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
order.post('/create-order', validate,  orders.createOrder);

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
order.get('/getAllOrder', validate,   orders.fetchAllOrder);

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
order.get('/:id', validate,  orders.fetchOrderById);

export default order;
