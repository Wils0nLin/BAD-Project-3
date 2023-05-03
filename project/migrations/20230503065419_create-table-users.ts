import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users',(table)=>{
        table.increments();
        table.integer('income_id')
        table.foreign('income_id').references("income.id")
        table.integer('home_size_id')
        table.foreign('home_size_id').references('home_size.id')

        table.string('u_name',20).notNullable();
        table.string('u_phone_number',8).notNullable();
        table.string('u_email',30).notNullable();
        table.string('u_address',100).notNullable();
        table.string('u_password',20).notNullable();
        table.string('u_username',10).notNullable();
        table.boolean('existed_pet');
        table.boolean('pet_before')
        table.boolean('is_allergy')
        table.boolean('smoker')
        table.boolean('is_banned').defaultTo('0')
        table.date('u_birth_date')
        table.text('knowledge')
        table.text('future_plan')
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('users')
}

