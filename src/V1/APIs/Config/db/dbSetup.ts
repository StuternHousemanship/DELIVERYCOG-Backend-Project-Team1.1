import knex from 'knex';
import knexfile from '../knexfile';
import { Model } from 'objection';

const setupDb = () => {
    console.log('Database connected')
    const db = knex(knexfile.development);
    Model.knex(db);
};

export default setupDb;
