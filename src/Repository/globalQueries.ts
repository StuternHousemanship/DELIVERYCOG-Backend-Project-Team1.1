import DB from '../config/db/Connection';
import { User, UpdateOne } from '../models/User';

class GlobalQueries {
    async findOne(
        table: string,
        column: string,
        value: string | number | null
    ) {
        const conn = await DB.client.connect();
        const sql = `SELECT * FROM ${table} WHERE ${column}='${value}' ORDER BY id DESC`;
        const res = await conn.query(sql);
        conn.release();
        return res.rows;
    }

    async updateOne(obj: UpdateOne) {
        const conn = await DB.client.connect();
        const sql = `UPDATE ${obj.table} SET ${obj.setColumn}='${obj.setValue}' WHERE ${obj.uniqueColumn}='${obj.uniqueValue}' RETURNING *`;
        const res = await conn.query(sql);
        conn.release();
        return res.rows;
    }
}
export default GlobalQueries;
