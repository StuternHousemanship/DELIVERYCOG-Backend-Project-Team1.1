// import { Orders, OrderType } from '../../Models/orders';
import { User, Orders, OrderType, UserType } from '../../Models/User';


export default class OrderRepository {
    async createOrder(orders: OrderType): Promise<OrderType> {
        const newOrder: any = await Orders.query()
        .insert({
            item: orders.item,
            destination: orders.destination,
            reciever_name: orders.reciever_name,
            reciever_number: orders.reciever_number,
        });
        return newOrder;
    }

}