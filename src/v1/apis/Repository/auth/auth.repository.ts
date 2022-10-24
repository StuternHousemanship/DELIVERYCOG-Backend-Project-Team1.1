import DB from '../../config/db/Connection';
import { Encryption } from '../../Utilities/bcrypt';
import { User } from '../../Models/User';
import GlobalQueries from '../globalQueries';

const globalQueries = new GlobalQueries();
export default class AuthRepository {
    async createUser(user: User): Promise<User> {
        const conn = await DB.client.connect();
        const sql =
            'INSERT INTO users (first_name, last_name, password_digest, phone_number, email, verification_code) VALUES($1, $2, $3, $4, $5,$6) RETURNING * ';

        const hashPassword = await new Encryption().bcrypt(
            user.password_digest
        );
        const result = await conn.query(sql, [
            user.first_name,
            user.last_name,
            hashPassword,
            user.phone_number,
            user.email,
            user.verification_code,
        ]);
        conn.release();
        return result.rows[0];
    }
    async authenticate(
        email: string,
        password: string
    ): Promise<User | undefined> {
        const user = await globalQueries.findOne({
            model: 'users',
            table: 'email',
            value: email,
        });
        const checkPassword = await new Encryption().compare(
            password,
            user.password_digest
        );

        if (!checkPassword) {
            return undefined;
        }
        return user;
    }
}
