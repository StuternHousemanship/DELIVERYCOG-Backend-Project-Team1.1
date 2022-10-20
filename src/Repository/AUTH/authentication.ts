import bcrypt from 'bcrypt';
import DB from '../../config/db/Connection';
import { pepper, saltRound } from '../../utilities/bcrypt';
import { User, LoginUser } from '../../models/User';
import GlobalQueries from '../globalQueries';

const globalQuery = new GlobalQueries();

export default class AuthRepository {
    async createUser(user: User): Promise<User[]> {
        const conn = await DB.client.connect();
        const sql =
            'INSERT INTO users (first_name, last_name, password_digest, phone_number, email,verification_code) VALUES($1, $2, $3, $4, $5,$6) RETURNING * ';
        const hashPassword = await bcrypt.hash(
            user.password_digest + pepper,
            saltRound
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
        return result.rows;
    }

    async authenticate(user: LoginUser): Promise<User[] | null | undefined> {
        const loginUser = await globalQuery.findOne(
            'users',
            'email',
            user.email
        );
        if (loginUser.length > 0) {
            if (
                await bcrypt.compare(
                    user.password + pepper,
                    loginUser[0].password_digest
                )
            ) {
                return loginUser;
            }
            return undefined;
        }
        return null;
    }
}
