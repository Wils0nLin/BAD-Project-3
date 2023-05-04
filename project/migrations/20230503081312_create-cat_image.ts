import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('cat_image',(table)=>{
        table.increments();
        table.integer('cat_id');
        table.foreign('cat_id').references('cats.id');
        table.string('c_image',50);
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('cat_image')
}

