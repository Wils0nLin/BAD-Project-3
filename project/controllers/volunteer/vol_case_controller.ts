import { vol_case_service } from "../../services/volunteer/vol_case_service";
import { Request, Response } from "express";

export class vol_case_controller {
    constructor(private vol_post_service: vol_case_service) {}

    vol_case = async (req: Request, res: Response) => {
        try {
            const userid: any = req.session.userid;

            const vol_case = await this.vol_post_service.case(userid);

            res.status(200).json(vol_case);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "something wrong with the posts" });
        }
    };

    vol_case_info = async (req: Request, res: Response) => {
        try {
            const userid: any = req.session.userid;

            const vol_case = await this.vol_post_service.case_info(userid);

            res.status(200).json(vol_case);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "something wrong with the posts" });
        }
    };

    vol_case_accept = async (req: Request, res: Response) => {
        try {
            const userid: any = req.session.userid;

            const vol_case = await this.vol_post_service.case_accept(userid);

            res.status(200).json(vol_case);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "something wrong with the posts" });
        }
    };

    vol_case_reject = async (req: Request, res: Response) => {
        try {
            const userid: any = req.session.userid;

            const vol_case = await this.vol_post_service.case_reject(userid);

            res.status(200).json(vol_case);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "something wrong with the posts" });
        }
    };

    vol_case_event = async (req: Request, res: Response) => {
        try {
            const userid: any = req.session.userid;

            const vol_case = await this.vol_post_service.case_event(userid);

            res.status(200).json(vol_case);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "something wrong with the posts" });
        }
    };

    vol_case_edit = async (req: Request, res: Response) => {
        try {
            const userid: any = req.session.userid;

            const vol_case = await this.vol_post_service.case_edit(userid);

            res.status(200).json(vol_case);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "something wrong with the posts" });
        }
    };
}