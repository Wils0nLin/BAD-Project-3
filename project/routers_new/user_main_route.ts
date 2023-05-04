//All from user_xxx.ts
import { user_apply_Controller } from "../server";

import { user_event_insert_Controller } from "../server";

import { user_profile_data_Controller } from "../server";

//All from adopt_xxx.ts / cat_xxx.ts
import { user_adopt_form_Controller } from "../server";
import { user_cat_adopt_Controller } from "../server";
import { user_get_data_edit_case_Controller } from "../server";

import express from "express";

export const user_main_route = express.Router();

//from userApply.ts
user_main_route.post("/apply_form", user_apply_Controller.user_apply);

// from userEventInsert.ts
user_main_route.post("/confirm/:id", user_event_insert_Controller.user_event_insert);

//user profile
// from user_profile_route.ts
user_main_route.get("/user_profile_data", user_profile_data_Controller.user_get_profile);
// from user_profile_update.ts
user_main_route.put("/user_profile_update/:mid", user_profile_data_Controller.user_update_profile);

// from adoptFormRoute.ts
// 我的拎養
user_main_route.get("/apply_status_data", user_adopt_form_Controller.user_apply_status);
//我的拎養進度
user_main_route.get("/pending_case_data/:id", user_adopt_form_Controller.user_pending_case);
user_main_route.get("/get_event/:id", user_adopt_form_Controller.user_get_event_case);
user_main_route.get("/form_pre_place/:id", user_adopt_form_Controller.user_form_pre_place);

// from catAdoptRoute.ts
user_main_route.get("/cat_adopt_data", user_cat_adopt_Controller.get_all_cat);
user_main_route.get("/cat_adopt_data/:id", user_cat_adopt_Controller.get_cat_detail);

// from getData_editCase.ts
user_main_route.get(
    "/get_edit_case_detail/:id",
    user_get_data_edit_case_Controller.update_cat_profile
);
user_main_route.get(
    "/get_edit_case_detail/:id",
    user_get_data_edit_case_Controller.get_data_edit_case
);
