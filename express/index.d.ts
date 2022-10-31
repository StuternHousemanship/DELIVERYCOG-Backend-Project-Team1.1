import { User } from '../src/V1/APIs/Models/User';

declare global {
    declare namespace Express {
        interface Request {
            user: User;
        }
    }
}
