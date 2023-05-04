import express from "express";
import expressSession from "express-session";
import path from "path";
import pg from "pg";
import type { Request, Response, NextFunction } from "express";

//try
import dotenv from "dotenv";
dotenv.config();
import Knex from "knex";
import knexConfig from "./knexfile";
//

export const dbClient = new pg.Client({
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
});
dbClient.connect();

//try
const knex: any = Knex(knexConfig[process.env.NODE_ENV || "development"]);
//try

declare module "express-session" {
    interface SessionData {
        isLoggedIn?: boolean;
        userid?: number;
        username?: string;
        userType?: string;
        caseID?: number;
        catId?: number;
    }
}

const app = express();

//
// ------------------------------ Middleware ------------------------------ //
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    expressSession({
        secret: "Cat Platform typescript",
        resave: true,
        saveUninitialized: true,
    })
);

app.use((req, _res, next) => {
    console.log(`Path ${req.path}, Method: ${req.method}`);
    next();
});

//
// ------------------------------ Route Handlers ------------------------------ //
import { registerRoute } from "./routers/user_register";
import { volunteer_registerRoute } from "./routers/volunteer_register";
import { userLoginRoute } from "./routers/userLoginRoute";

//------------舊野------------//
// import { volLoginRoute } from "./routers/volLoginRoute";
// import { userProfileRoute } from "./routers/userProfileRoute";
// import { volProfileRoute } from "./routers/volProfileRoute";
// import { catPostRoute } from "./routers/catPostRoutes";
// import { userApply } from "./routers/userApply";
// import { getPostedRoute } from "./routers/getPostedRoute";
// import { getDataEditCase } from "./routers/getData_editCase";
// import { volInsert } from "./routers/VolEventInsert";
// import { userInsert } from "./routers/userEventInsert";
// import {
//     applyStatusRoute,
//     adoptStatusRoute,
//     adoptFormRoute,
//     pendingCaseRoute,
// } from "./routers/adoptFormRoute";
// import { catAdoptRoute, catProfileRoute } from "./routers/catAdoptRoute";
// import { userAdoptFromroute } from "./routers/adoptFormRoute";
// import { vol_update } from "./routers/vol_profile_update";
// import { user_update } from "./routers/user_profile_update";
//--------------------------//

// ------------------------------ Controller ------------------------------ //
import { user_login_controller } from "./controllers/public/user_login_controller";
import { user_register_controller } from "./controllers/public/user_register_controller";
import { user_apply_controller } from "./controllers/user/user_apply_controller";
import { user_adopt_form_controller } from "./controllers/user/user_adopt_form_controller";
import { user_cat_adopt_controller } from "./controllers/user/user_cat_adopt_controller";
import { user_event_insert_controller } from "./controllers/user/user_event_insert_controller";
import { user_get_data_edit_case_controller } from "./controllers/user/user_get_data_edit_case_controller";
import { user_profile_data_controller } from "./controllers/user/user_profile_data_controller";
// By Tyson
import { vol_login_controller } from "./controllers/public/vol_login_controller";
import { vol_profile_controller } from "./controllers/volunteer/vol_profile_controller";
import { vol_post_controller } from "./controllers/volunteer/vol_post_controller";
import { vol_case_controller } from "./controllers/volunteer/vol_case_controller";
// By Wilson

// ------------------------------ Service ------------------------------ //
import { user_login_service } from "./services/public/user_login_service";
import { user_register_service } from "./services/public/user_register_service";
import { user_apply_service } from "./services/user/user_apply_service";
import { user_adopt_form_service } from "./services/user/user_adopt_form_service";
import { user_cat_adopt_service } from "./services/user/user_cat_adopt_service";
import { user_event_insert_service } from "./services/user/user_event_insert_service";
import { user_get_data_edit_case_service } from "./services/user/user_get_data_edit_case_service";
import { user_profile_data_service } from "./services/user/user_profile_data_service";

//------------------------------ Run User Controller and Service ------------------------------ //
const user_login_Service = new user_login_service(knex);
export const user_login_Controller = new user_login_controller(user_login_Service);

const user_register_Service = new user_register_service(knex);
export const user_register_Controller = new user_register_controller(user_register_Service);

// const user_apply_Service = new user_apply_service(dbClient);
// export const user_apply_Controller = new user_apply_controller(user_apply_Service);
const user_apply_Service = new user_apply_service(knex);
export const user_apply_Controller = new user_apply_controller(user_apply_Service);

// const user_adopt_form_Service = new user_adopt_form_service(dbClient);
// export const user_adopt_form_Controller = new user_adopt_form_controller(user_adopt_form_Service);
const user_adopt_form_Service = new user_adopt_form_service(knex);
export const user_adopt_form_Controller = new user_adopt_form_controller(user_adopt_form_Service);

// const user_cat_adopt_Service = new user_cat_adopt_service(dbClient);
// export const user_cat_adopt_Controller = new user_cat_adopt_controller(user_cat_adopt_Service);
const user_cat_adopt_Service = new user_cat_adopt_service(knex);
export const user_cat_adopt_Controller = new user_cat_adopt_controller(user_cat_adopt_Service);

// const user_event_insert_Service = new user_event_insert_service(dbClient);
// export const user_event_insert_Controller = new user_event_insert_controller(
//     user_event_insert_Service
// );
const user_event_insert_Service = new user_event_insert_service(knex);
export const user_event_insert_Controller = new user_event_insert_controller(
    user_event_insert_Service
);

// const user_get_data_edit_case_Service = new user_get_data_edit_case_service(dbClient);
// export const user_get_data_edit_case_Controller = new user_get_data_edit_case_controller(
//     user_get_data_edit_case_Service
// );
const user_get_data_edit_case_Service = new user_get_data_edit_case_service(knex);
export const user_get_data_edit_case_Controller = new user_get_data_edit_case_controller(
    user_get_data_edit_case_Service
);

// const user_profile_data_Service = new user_profile_data_service(dbClient);
// export const user_profile_data_Controller = new user_profile_data_controller(
//     user_profile_data_Service
// );
const user_profile_data_Service = new user_profile_data_service(knex);
export const user_profile_data_Controller = new user_profile_data_controller(
    user_profile_data_Service
);
// By Tyson
//-------------------------------------------------------------------------------------- //

import { vol_login_service } from "./services/public/vol_login_service";
import { vol_profile_service } from "./services/volunteer/vol_profile_service";
import { vol_post_service } from "./services/volunteer/vol_post_service";
import { vol_case_service } from "./services/volunteer/vol_case_service";

const volLoginService = new vol_login_service(knex);
const volProfileService = new vol_profile_service(knex);
const volPostService = new vol_post_service(knex);
const volCaseService = new vol_case_service(knex);
export const volLoginController = new vol_login_controller(volLoginService);
export const volProfileController = new vol_profile_controller(volProfileService);
export const volPostController = new vol_post_controller(volPostService);
export const volCaseController = new vol_case_controller(volCaseService);
// By Wilson

// ------------------------------New Route Handlers ------------------------------ //
import { public_main_route } from "./routers_new/public_main_route";
import { user_main_route } from "./routers_new/user_main_route";
import { vol_main_route } from "./routers_new/vol_main_route";
app.use(public_main_route);
app.use(user_main_route);
app.use(vol_main_route);

// ---------- User Register ---------- //
app.use("/user_register", registerRoute);
// ---------- Volunteer Register ---------- //
app.use("/volunteer_register", volunteer_registerRoute);
// ---------- User Login ---------- //
app.use("/user_loginRoute", userLoginRoute);
app.get("/userloginstatus", (req, res) => {
    if (req.session.isLoggedIn) {
        const userLoginInfo = {
            userid: req.session.id,
            username: req.session.username,
            userType: req.session.userType,
        };
        res.status(200).json(userLoginInfo);
    } else {
        res.status(200).json({ message: "Not Logged in" });
    }
});
// ---------- Volunteer Login ---------- //
app.get("/volunteerloginstatus", (req, res) => {
    if (req.session.isLoggedIn) {
        const volLoginInfo = {
            userid: req.session.id,
            username: req.session.username,
            userType: req.session.userType,
        };
        res.status(200).json(volLoginInfo);
    } else {
        res.status(200).json({ message: "Not Logged in" });
    }
});

//------------舊野------------//
// ---------- Profile Page ---------- //
// app.use(userProfileRoute);
// app.use(volProfileRoute);
// app.use("/vol_update", vol_update);
// app.use(catProfileRoute);
// app.use('/user_profile_update',user_update)
// // ---------- Adoption Posting Page ---------- //
// app.use(catPostRoute);
// app.use(catAdoptRoute);
// // ---------- Adoption Review Page ---------- //
// app.use(applyStatusRoute);
// app.use(adoptStatusRoute);
// app.use(adoptFormRoute);
// app.use(pendingCaseRoute);
// app.use(userAdoptFromroute);
// app.use(userApply);
// app.use(getPostedRoute);
// app.use(getDataEditCase);
// app.use(volInsert);
// app.use(userInsert);
//----------------------------//

//
// ------------------------------ Serve ------------------------------ //
app.use(express.static("public"));
app.use(express.static("uploads"));
// ---------- User Login ---------- //
const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.isLoggedIn) next();
    else res.redirect("/");
};
app.use(userMiddleware, express.static(path.join(__dirname, "private", "userPrivate")));
// ---------- Volunteer Login ---------- //
const volMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.isLoggedIn) next();
    else res.redirect("/");
};
app.use(volMiddleware, express.static(path.join(__dirname, "private", "volPrivate")));

//
// ------------------------------ Error Handling ------------------------------ //
app.use((_req, res) => {
    res.sendFile(path.join(__dirname, "public", "404.html"));
});

//
// ------------------------------ ------------------------------ //
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
});
