import DB from '../config/db/Connection';
import { User } from '../services/AUTH/authentication';

class GlobalQueries {
    async findOne(
        table: string,
        column: string,
        value: string | number | null
    ): Promise<User[]> {
        const conn = await DB.client.connect();
        const sql = `SELECT * FROM ${table} WHERE ${column}='${value}' ORDER BY id DESC`;
        const res = await conn.query(sql);
        conn.release();
        return res.rows;
    }
}
export default GlobalQueries;
