import type { Server as SocketIO } from "socket.io";

export class vol_profile_controller {
    constructor(private vol_service_service: vol_service_service, private io: SocketIO) {}

    async function updateCatProfile(req: Request, res: Response) {
        
    }
}