import { Request, Response, NextFunction } from "express";

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.isLoggedIn) {
        if (req.session.userType === "user") next();
        // suggest response front with RESTful API configuration
        // res.status(401).json({msg: 'unauthorized'})
    } else res.redirect("/");
};

export const volMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.isLoggedIn) {
        if (req.session.userType === "volunteer") next();
    } else res.redirect("/");
};