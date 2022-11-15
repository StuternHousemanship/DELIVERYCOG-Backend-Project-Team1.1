
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
    async getAllOrder(userId: string | number): Promise<OrderType[]> {
        const orders: OrderType[] = (await Orders.query().where('userId', userId).then(rows => rows)) as OrderType[];

        return orders ;
    }
    async getOrderById(orderId: string | number, userId: string | number): Promise<OrderType[]> {
        const orders: OrderType[] = (await Orders.query().where('id', orderId).andWhere('userId', userId).then(rows => rows)) as OrderType[];

        return orders;
    }

}