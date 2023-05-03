import { User } from "../../model";
import type { Knex } from "knex";

export class vol_profile_service {
    constructor(private knex: Knex) {}
    
    vol_profile_info = async () => {
        const queryResult = await this.knex<User>("user")
            .select("id", "content", "image")
            .orderBy("id", "desc");
        return queryResult;
    };
}
