import { User } from '../../Models/User';

export default class Validation {
    validateEmail = async (column:string, value: string): Promise<string | undefined> => {
        const user: any = await User.query().where(column, value);
        if (user.length > 0) {
            return user[0];
        }
        return undefined;
    };
    validatePhoneNumber = async (phoneNumber: number): Promise<number | undefined> => {
        const userphoneNumber: any = await User.query().where(
            'phone_number', phoneNumber
        );
        if (userphoneNumber.length > 0) {
            return userphoneNumber[0].phone_number;
        }
        return undefined;
    };

    isVerified = async (email: string): Promise<boolean | undefined> => {
        const user: any = await User.query().where('email', email);
        if (user.is_verified) {
            return true;
        }
        return false;
    };
}
