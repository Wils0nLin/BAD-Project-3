import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('home_size',(table)=>{
        table.increments();
        table.string('home_size',20)
})
await knex('home_size').insert([{home_size:'400呎以下'},{home_size:'401-800呎'},{home_size:'801呎以上'}])


}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('home_size')
}

