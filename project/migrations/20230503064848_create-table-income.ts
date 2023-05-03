import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('income',(table)=>{
        table.increments();
        table.string('income_value',20);
    })       
await knex('income').insert([{income_value:'沒有收入'},{income_value:'20000以下'},{income_value:'60000以下'},{income_value:'100000以上'}])

   

}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('income');
}

