import { Model } from 'objection';

export interface OrderType {
    sender_id?: number;
    item: string;
    reciever_name: string;
    reciever_number: number;
    destination: string,
    created_at?: string;
}


export class Orders extends Model {
    static get tableName() {
        return 'orders';
    }
};