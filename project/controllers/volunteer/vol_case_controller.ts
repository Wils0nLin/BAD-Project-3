import { vol_case_service } from "../../services/volunteer/vol_case_service";
import { Request, Response } from "express";

export class vol_case_controller {
    constructor(private vol_case_service: vol_case_service) {}

    vol_case = async (req: Request, res: Response) => {
        try {
            const userid: any = req.session.userid;

            const vol_case = await this.vol_case_service.case(userid);

            res.status(200).json(vol_case);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "something wrong with the cases" });
        }
    };

    vol_case_info = async (req: Request, res: Response) => {
        try {
            const caseId = +req.params.id;

            const vol_case = await this.vol_case_service.case_info(caseId);

            res.status(200).json(vol_case);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "something wrong with the posts" });
        }
    };

    vol_case_accept = async (req: Request, res: Response) => {
        try {
            const caseId = +req.params.id;

            await this.vol_case_service.case_accept(caseId);

            res.status(200).json({ message: "success" });
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "something wrong with the posts" });
        }
    };

    vol_case_reject = async (req: Request, res: Response) => {
        try {
            const caseId = +req.params.id;

            await this.vol_case_service.case_reject(caseId);

            res.status(200).json({ message: "success" });
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "something wrong with the posts" });
        }
    };

    vol_case_event = async (req: Request, res: Response) => {
        try {
            const caseId = +req.params.id;

            const vol_case = await this.vol_case_service.case_event(caseId);

            res.status(200).json(vol_case);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "something wrong with the posts" });
        }
    };

    vol_case_edit = async (req: Request, res: Response) => {
        try {
            for (let BodyObj of req.body) {
                let DateAndTime = BodyObj.Date.split("T");
                const caseId = BodyObj.id;
                const date = DateAndTime[0];
                const time = DateAndTime[1];
                const event = BodyObj.Event;

                await this.vol_case_service.case_edit(caseId, date, time, event);
            }
            
            res.status(200).json({ message: "success" });
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "something wrong with the posts" });
        }
    };
}
