import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('cats',(table)=>{
        table.increments();
        table.integer('volunteer_id').notNullable;
        table.foreign('volunteer_id').references('volunteers.id');
        table.boolean('is_finish').defaultTo('0');
        table.text('intro').notNullable();
        table.date('age').notNullable();
        table.string('c_name',20).notNullable();
        table.string('gender',1).notNullable();
        table.string('breed',30).notNullable();
        table.string('character',20).notNullable();
        table.string('cat_health').notNullable();
        table.string('food_habits').notNullable();
        table.string('is_shown').defaultTo('0');
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('cats')
}

