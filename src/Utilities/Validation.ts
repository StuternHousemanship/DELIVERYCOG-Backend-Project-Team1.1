import jwt from 'jsonwebtoken';
import { User } from '../Models/User';
import GlobalQueries from '../Repository/globalQueries';

const globalQuery = new GlobalQueries();

class Validation {
    validateEmail = async (email: string): Promise<string | undefined> => {
        const user: User[] = await globalQuery.findOne('users', 'email', email);
        if (user.length > 0) {
            return user[0].email;
        }
        return undefined;
    };

    validatePhoneNumber = async (
        phoneNumber: number
    ): Promise<number | undefined> => {
        const userphoneNumber = await globalQuery.findOne(
            'users',
            'phone_number',
            phoneNumber
        );
        if (userphoneNumber.length > 0) {
            return userphoneNumber[0].phone_number;
        }
        return undefined;
    };

    isActive = async (email: string): Promise<boolean | undefined> => {
        const user = await globalQuery.findOne('users', 'email', email);
        if (user[0].is_verified) {
            return true;
        }
        return false;
    };

    generateAccessToken = (user: User[]): string => {
        const secret = String(process.env.AccessToken);
        const data = {
            user_id: user[0].id,
            email: user[0].email,
        };
        return jwt.sign(data, secret, { expiresIn: '1800s' });
    };
}

export default Validation;
