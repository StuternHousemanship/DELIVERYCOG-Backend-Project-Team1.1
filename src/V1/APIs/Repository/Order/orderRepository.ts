import { Orders, OrderType } from '../../Models/orders';

export default class OrderRepository {
    async createOrder(orders: OrderType): Promise<OrderType> {
        const newOrder: any = await Orders.query().insert({
            item: orders.item,
            reciever_name: orders.reciever_name,
            reciever_number: orders.reciever_number,
            destination: orders.destination
        });
        return newOrder;
    }

}