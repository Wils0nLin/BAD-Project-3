import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('volunteers',(table)=>{
        table.increments();
        table.string('v_name',20).notNullable();
        table.string('v_phone_number',20).notNullable();
        table.string('v_email',30).notNullable();
        table.string('v_address',100).notNullable();
        table.string('v_password',100).notNullable();
        table.string('v_username',20).notNullable();
        table.date('v_birth_date').notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('volunteers')
}

