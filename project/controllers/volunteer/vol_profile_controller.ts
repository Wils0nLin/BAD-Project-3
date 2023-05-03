import { dbClient } from "../../server";
import { vol_profile_service } from "../../services/volunteer/vol_profile_service";
import type { Request, Response } from "express";
import type { Server as SocketIO } from "socket.io";



export class vol_profile_controller {
    constructor(private vol_profile_service: vol_profile_service, private io: SocketIO) {}

    async function vol_profile_info(req: Request, res: Response) {
        try {
            const vol_profile = await this.vol_profile_service.vol_profile_info();
            res.json(vol_profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: "internal server error" });
        }


        const queryResult = await dbClient.query<User>(
            `SELECT * FROM volunteers WHERE v_username = '${req.session.username}'`
        );
        const volProfile = queryResult.rows[0];
        res.json(volProfile);
    }
}