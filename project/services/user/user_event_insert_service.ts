import type { Knex } from "knex";
import { Request, Response } from "express";

export class user_event_insert_service {
    constructor(private knex: Knex) {}

    user_event_insert = async (req: Request, res: Response) => {
        await this.knex.raw(`UPDATE events set is_select = '1' WHERE id =${req.body.date_id}`);

        await this.knex.raw(
            `UPDATE events set is_shown = '0' WHERE adopt_forms_id = ${req.params.caseID}`
        );
        res.json({ succuss: true });
    };
}