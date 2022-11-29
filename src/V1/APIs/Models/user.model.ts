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
    user_type: string;
    is_active?: boolean;
    long_lat?: number;
}


export class User extends Model {
    static get tableName() {
        return 'users';
    }
}
