import { Knex } from 'knex';
import { UserType } from '../../Models/User';

export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTable('users', (table) => {
        table.increments('id').primary();
        table.string('first_name', 50).notNullable();
        table.string('last_name', 50).notNullable();
        table.string('password_digest', 100).notNullable();
        table.bigInteger('phone_number').notNullable();
        table.string('email', 100).unique().notNullable();
        table.integer('verification_code', 10);
        table.boolean('is_verified').notNullable().defaultTo('false');
        table.timestamps(true, true);
    })
    .createTable('orders', (table) => {
        table.increments('id').primary;
        // table.integer('sender_id').notNullable().references('id').inTable('users');
        table.string('item', 50).notNullable();
        table.string('destination', 100).notNullable();
        table.string('reciever_name', 100).notNullable();
        table.bigInteger('reciever_number').notNullable();
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('orders');

}
