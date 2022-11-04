import { Encryption } from '../../Utilities/bcrypt';
import { User, UserType } from '../../Models/User';
import crypto from 'crypto';

export default class AuthRepository {
    async createUser(user: UserType): Promise<UserType> {
        const hashPassword = await new Encryption().bcrypt(
            user.password_digest
        );
        const newUser: any = await User.query().insert({
            first_name: user.first_name,
            last_name: user.last_name,
            password_digest: hashPassword,
            phone_number: user.phone_number,
            email: user.email,
            verification_code: user.verification_code,
        });
        return newUser;
    }
    
    async authenticate(email: string, password: string): Promise<UserType[] | undefined> {
        const user: any = await User.query().where('email', email);
        const checkPassword = await new Encryption().compare(
            password,
            user[0].password_digest
        );

        if (!checkPassword) {
            return undefined;
        }
        return user;
    }
    async resetUser(userData: { password: string, email: string }) {

        const user: any = await User.query().where('email', userData.email);

        const hashPassword = await new Encryption().bcrypt(
            userData.password
        );

        const updateUserPassword: any = await User.query().where('email', userData.email).patch({
            password_digest: hashPassword,
            verification_code: crypto.randomInt(100000, 1000000)
        });

        let newUser: UserType | false = updateUserPassword ? user : false;

        return newUser;
    }
}