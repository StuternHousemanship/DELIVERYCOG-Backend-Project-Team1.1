import { Model } from 'objection';

export interface UserType  {
    id?: number;
    first_name: string;
    last_name: string;
    password_digest: string;
    phone_number: number;
    email: string;
    verification_code?: number;
    is_verified?: boolean;
    created_at?: string;
}

export interface OrderType {
    // sender_id?: number;
    item: string;
    reciever_name: string;
    reciever_number: number;
    destination: string,
    created_at?: string;
}

export class User extends Model {
    static get tableName() {
        return 'users';
    }
}

export class Orders extends Model {
    static get tableName() {
        return 'orders';
    }
}

