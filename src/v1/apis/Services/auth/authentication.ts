import bcrypt from 'bcrypt';
import crypto, { createHmac } from 'crypto';
import DB from '../../config/db/Connection';
import { pepper, saltRound, secret } from '../bcrypt';
import { User } from '../../Models/User';
import GlobalQueries from '../../Repository/globalQueries';

const globalQuery = new GlobalQueries();
export default class AuthService {
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

    async forgotpassword(email: string) {
        const code = crypto.randomInt(100000, 1000000);
        const encryptedCode = await bcrypt.hash(code + pepper, saltRound);
        
        const forgot: User[] = await globalQuery.updateOne({
            model: 'users',
            table: 'verification_code',
            value: code,
            uniqueColumn: 'email',
            uniqueValue: email,
        });
          
        return forgot.length > 0 ? forgot : false;
    }
}
