import { Model } from 'objection';

export interface OrderType {
    userId?: string | number;
    item: string;
    reciever_name: string;
    reciever_number: number;
    sender_name: string;
    sender_number: string | number;
    destination: string,
    created_at?: string;
}

export class Orders extends Model {
    static get tableName() {
        return 'orders';
    }
}
