import DB from '../config/db/Connection';
import { User } from '../services/AUTH/authentication';

export interface UpdateOne {
    table: string;
    setColumn: string;
    setValue: string | number | null;
    uniqueColumn: string;
    uniqueValue: string | number | null;
}

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

    async updateOne(obj: UpdateOne): Promise<User[]> {
        const conn = await DB.client.connect();
        const sql = `UPDATE ${obj.table} SET ${obj.setColumn}='${obj.setValue}' WHERE ${obj.uniqueColumn}='${obj.uniqueValue}' RETURNING *`;
        const res = await conn.query(sql);
        conn.release();
        return res.rows;
    }
}
export default GlobalQueries;
