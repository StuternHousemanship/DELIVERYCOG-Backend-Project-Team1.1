
import { Orders, OrderType } from '../../Models/order.model';


export default class OrderRepository {
    async createOrder(order: OrderType): Promise<OrderType> {
        const { userId, item, destination, sender_name, sender_number, reciever_name, reciever_number } = order;
        const newOrder: any = await Orders.query()
            .insert({
                userId, item, destination,
                sender_name, sender_number,
                reciever_name, reciever_number
            });
        return newOrder as OrderType;
    }

}