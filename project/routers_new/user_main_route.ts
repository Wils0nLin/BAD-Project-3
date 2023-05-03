//All from user_xxx.ts
import { user_apply_controller } from "../server";
import { user_insert_controller } from "../server";
import { user_apply_controller } from "../server";
import { user_profile_data_controller } from "../server";

//All from adopt_xxx.ts / cat_xxx.ts
import { adopt_form_controller } from "../server";
import { cat_adopt_controller } from "../server";
import { get_data_edit_case_controller } from "../server";

import express from "express";

export const user_main_route = express.Router();

//from user_apply.ts
user_main_route.post("/apply_form", user_apply_controller.user_apply);

// from user_event_insert.ts
user_main_route.post("/confirm/:id", user_insert_controller.user_event_insert);

//from user_profile_route.ts
user_main_route.get("/user_profile_data", user_profile_data_controller.user_profile_data);

//from adopt_form_route.ts
// 我的拎養
user_main_route.get("/apply_status_data", adopt_form_controller.apply_status);
//我的拎養進度
user_main_route.get("/pending_case_data/:id", adopt_form_controller.pending_case);
user_main_route.get("/get_event/:id", adopt_form_controller.pending_case);
user_main_route.get("/form_pre_place/:id", adopt_form_controller.user_adopt_form);

//from catAdoptRoute.ts
user_main_route.get("/cat_adopt_data", cat_adopt_controller.getAllCat);
user_main_route.get("/cat_adopt_data/:id", cat_adopt_controller.getCatDetail);

//from getData_editCase.ts
user_main_route.get("/get_edit_case_detail/:id", get_data_edit_case_controller);
