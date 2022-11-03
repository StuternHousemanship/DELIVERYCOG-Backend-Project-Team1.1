import dotenv from 'dotenv';
import type { Knex } from 'knex';

// Update with your config settings.
import { knexSnakeCaseMappers } from 'objection';

dotenv.config({ path: '.env' });
console.log(__dirname + '/db/seeds')

const config: { [key: string]: Knex.Config } = {
    development: {
        client: 'postgresql',
        connection: {
            database: `${process.env.POSTGRES_DB}`,
            user: `${process.env.POSTGRES_USER}`,
            password: `${process.env.POSTGRES_PASSWORD}`,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
        seeds: {
            directory: __dirname + '/db/seeds'
          },
        ...knexSnakeCaseMappers,
    },
    production: {
        client: 'postgresql',
        connection: {
            database: `${process.env.POSTGRES_DB}`,
            user: `${process.env.POSTGRES_USER}`,
            password: `${process.env.POSTGRES_PASSWORD}`,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
        seeds: {
            directory: __dirname + '/db/seeds'
          },
        ...knexSnakeCaseMappers,
    },
};

export default config;
