import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('orders', (table) => {
        table.increments('id');
        table.integer('sender_id', 50).notNullable().references('id').inTable('users');
        table.string('package_name', 50).notNullable();
        table.string('destination', 100).notNullable();
        table.string('reciever_name').notNullable();
        table.string('reciever_number', 100).unique().notNullable();
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
        return knex.schema.dropTableIfExists('orders');
    }

