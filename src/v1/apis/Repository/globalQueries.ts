import DB from '../config/db/Connection';
import { AppError } from '../Utilities/errors/appError';
import { Query } from '../Models/globalQueries';
import { NextFunction } from 'express';
class GlobalQueries {
    async findOne(query: Query) {
        try {
            const conn = await DB.client.connect();
            const sql = `SELECT * FROM ${query.model} WHERE ${query.table}='${query.value}' ORDER BY id DESC LIMIT 1`;
            const res = await conn.query(sql);

            conn.release();
            return res.rows[0] === undefined ? [] : res.rows[0];
        } catch (error) {
            throw new AppError(`${error}`, 404);
        }
    }

    async updateOne(query: Query) {
        try {
            const conn = await DB.client.connect();
            const sql = `UPDATE ${query.model} SET ${query.table}='${query.value}' WHERE ${query.uniqueColumn}='${query.uniqueValue}' RETURNING *`;
            const res = await conn.query(sql);
            conn.release();
            return res.rows[0];
        } catch (error) {
            throw new AppError(`${error}`, 500);
        }
    }

    async exist(query: Query): Promise<boolean> {
        try {
            const conn = await DB.client.connect();
            const sql = `SELECT * FROM ${query.model} WHERE ${query.table}='${query.value}'`;

            const res = await conn.query(sql);
            conn.release();

            return res.rowCount > 0 ? true : false;
        } catch (error) {
            throw new AppError(`${error}`, 404);
        }
    }

    async findWhere(query: Query) {
        try {
            const conn = await DB.client.connect();
            const sql = `SELECT * FROM ${query.model} WHERE ${query.table}='${query.value}' ORDER BY id DESC LIMIT 10`;

            const res = await conn.query(sql);
            conn.release();
            return res.rows;
        } catch (error) {
            throw new AppError(`${error}`, 404);
        }
    }

    async findAll(model: string, limit: number | string) {
        try {
            if (isNaN(Number(limit))) limit = 10;

            const conn = await DB.client.connect();
            const sql = `SELECT * FROM ${model} ORDER BY id DESC LIMIT ${limit}`;
            const res = await conn.query(sql);
            conn.release();

            return res.rows;
        } catch (error) {
            throw new AppError(`${error}`, 404);
        }
    }

    async search(
        model: string,
        column_name: string,
        pattern: string | number,
        limit: number
    ) {
        try {
            const conn = await DB.client.connect();
            const sql = `SELECT * FROM ${model} WHERE ${column_name} LIKE '%${pattern}%' ORDER BY id ASC LIMIT ${limit}`;
            const res = await conn.query(sql);
            conn.release();

            return res.rows;
        } catch (error) {
            throw new AppError(`${error}`, 404);
        }
    }

    async destroy(model: string, id: number | string | undefined) {
        try {
            const conn = await DB.client.connect();
            const sql = `DELETE FROM ${model} WHERE id=${id};`;
            const res = await conn.query(sql);
            conn.release();

            return res.rowCount >= 1;
        } catch (error) {
            throw new AppError('Internal Server Error', 500);
        }
    }
}
export default GlobalQueries;
