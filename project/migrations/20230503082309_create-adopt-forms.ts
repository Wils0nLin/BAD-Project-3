import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('adopt_forms',(table)=>{
        table.increments();
        table.integer('cat_id');
        table.foreign('cat_id').references('cats.id')
        table.integer('user_id')
        table.foreign('user_id').references('users.id');
        table.string('adopt_status',50)
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('adopt_forms')
}

