import knex from 'knex';
import knexfile from '../knexfile';
import { Model } from 'objection';

const setupDb = () => {
    const db = knex(knexfile.development);
    Model.knex(db);
    console.log('Database connected')
};

export default setupDb;
