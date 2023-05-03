import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('events',(table)=>{
        table.increments();
        table.string('event',20)
        table.integer('adopt_forms_id')
        table.foreign('adopt_forms_id').references("adopt_forms.id");
        table.date('date');
        table.string('time',10);
        table.boolean('is_select');
        table.boolean('is_shown').defaultTo('1');
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('events')
}

