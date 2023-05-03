//All from user_xxx.ts
import { user_apply_controller } from "../server";
import { user_event_insert_controller } from "../server";
import { user_apply_controller } from "../server";
import { user_profile_data_controller } from "../server";

//All from adopt_xxx.ts / cat_xxx.ts
import { user_adopt_form_controller } from "../server";
import { user_cat_adopt_controller } from "../server";
import { user_get_data_edit_case_controller } from "../server";

import express from "express";

export const user_main_route = express.Router();

//from userApply.ts
user_main_route.post("/apply_form", user_apply_controller.user_apply); //function name user_apply

// from userEventInsert.ts
user_main_route.post("/confirm/:id", user_event_insert_controller.user_event_insert);

//user profile
// from user_profile_route.ts
user_main_route.get("/user_profile_data", user_profile_data_controller.user_profile_data);
// from user_profile_update.ts
user_main_route.put("/:mid", user_profile_data_controller.user_profile_update);

// from adoptFormRoute.ts
// 我的拎養
user_main_route.get("/apply_status_data", user_adopt_form_controller.apply_status);
//我的拎養進度
user_main_route.get("/pending_case_data/:id", user_adopt_form_controller.pending_case);
user_main_route.get("/get_event/:id", user_adopt_form_controller.pending_case);
user_main_route.get("/form_pre_place/:id", user_adopt_form_controller.user_adopt_form);

// from catAdoptRoute.ts
user_main_route.get("/cat_adopt_data", user_cat_adopt_controller.getAllCat);
user_main_route.get("/cat_adopt_data/:id", user_cat_adopt_controller.getCatDetail);

// from getData_editCase.ts
user_main_route.get("/get_edit_case_detail/:id", user_get_data_edit_case_controller);
