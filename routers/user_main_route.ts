import { userProfileController } from "../server";
import { userApplyController } from "../server";

import express from "express";

export const user_main_route = express.Router();

// from  ../controllers/user/user_profile_controller.ts
user_main_route.get("/user_profile", userProfileController.user_profile);
user_main_route.put("/user_profile_update/:id", userProfileController.user_profile_edit);

// from  ../controllers/user/user_apply_controller.ts
// user_main_route.post("/user_apply_submit", userApplyController.user_apply_submit);
// user_main_route.get("/user_apply", userApplyController.user_apply);
// user_main_route.get("/user_apply_info/:id", userApplyController.user_apply_info);
// user_main_route.get("/user_apply_event/:id", userApplyController.user_apply_event);
// user_main_route.put("/user_apply_update/:id", userApplyController.user_apply_edit);

user_main_route.post("/application", userApplyController.create);
user_main_route.get("/applications", userApplyController.getAllForm);
user_main_route.get("/application/:id", userApplyController.getFormById);
user_main_route.get("/events/:id", userApplyController.getEventById);
user_main_route.put("/event/:id", userApplyController.update);