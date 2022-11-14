import { Model } from 'objection';

export interface UserType {
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


export class User extends Model {
    static get tableName() {
        return 'users';
    }
}

