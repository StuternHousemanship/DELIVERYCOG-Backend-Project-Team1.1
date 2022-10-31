import { Knex } from 'knex';
import { UserType } from '../../Models/User';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('first_name', 50);
        table.string('last_name', 50);
        table.string('password_digest', 100);
        table.bigInteger('phone_number');
        table.string('email', 100).unique();
        table.integer('verification_code', 10);
        table.boolean('is_verified').defaultTo('false');
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('users');
}
