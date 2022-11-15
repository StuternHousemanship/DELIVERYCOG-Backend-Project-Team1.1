import { UserType } from '../../src/V1/APIs/Models/user.model.ts';

declare global {
    declare namespace Express {
        interface Request {
            user: UserType;
        }
    }
}
