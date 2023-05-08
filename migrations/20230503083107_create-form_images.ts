import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('form_images',(table)=>{
        table.increments();
        table.integer('adopt_forms_id')
        table.foreign('adopt_forms_id').references('adopt_forms.id')
        table.string('f_image',255)
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('form_images')
}