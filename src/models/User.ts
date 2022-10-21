export interface User {
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
export interface LoginUser {
    password: string;
    email: string;
}
export interface UpdateOneQuery {
    table: string;
    setColumn: string;
    setValue: string | number | null;
    uniqueColumn: string;
    uniqueValue: string | number | null;
}
