import { User } from '../src/models/User';

declare global {
    declare namespace Express {
        interface Request {
            user: User[];
        }
    }
}
