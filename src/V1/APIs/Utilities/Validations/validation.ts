import { User, UserType } from '../../Models/User';

export default class Validation {
    where = async (column: string, value: string): Promise<UserType | undefined> => {
        const user: any = await User.query().where(column, value);
        if (user.length > 0) {
            return user[0];
        }
        return undefined;
    };
    whereAnd = async (column: string, value: string, column2: string, value2: string): Promise<UserType | undefined> => {
        const user: any = await User.query().where(
            column, value
        ).andWhere(column2, value2);
        if (user.length > 0) {
            return user[0];
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
