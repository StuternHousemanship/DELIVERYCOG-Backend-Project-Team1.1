import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
    NODE_ENV,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_HOST,
    DATABASE_PORT,
    POSTGRES_TEST_DB,
    POSTGRES_PASSWORD,
    DATABASE_URL,
} = process.env;

let client: Pool;
if (NODE_ENV === 'production') {
    const connectionString = DATABASE_URL;
    client = new Pool({
        connectionString,
        ssl: {
            rejectUnauthorized: false,
        },
    });
} else if (NODE_ENV === 'development') {
    client = new Pool({
        host: POSTGRES_HOST,
        user: POSTGRES_USER,
        database: POSTGRES_DB,
        password: POSTGRES_PASSWORD,
        port: parseInt(DATABASE_PORT as string, 10),
    });
} else {
    client = new Pool({
        host: POSTGRES_HOST,
        user: POSTGRES_USER,
        database: POSTGRES_TEST_DB,
        password: POSTGRES_PASSWORD,
        port: parseInt(DATABASE_PORT as string, 10),
    });
}

export default {
    client,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_HOST,
    DATABASE_PORT,
    POSTGRES_TEST_DB,
    POSTGRES_PASSWORD,
};
