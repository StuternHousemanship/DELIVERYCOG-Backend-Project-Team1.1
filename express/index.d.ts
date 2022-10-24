import { User } from '../src/Models/User';

declare global {
    declare namespace Express {
        interface Request {
            user: User[];
        }
    }
}
