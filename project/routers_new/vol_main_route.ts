import { vol_profile_controller } from "../server";
import { vol_post_controller } from "../server";
import { vol_case_controller } from "../server";
import { vol_event_controller } from "../server";

import express from "express";

export const vol_main_routes = express.Router();

// from  ../controllers/volunteer/vol_profile_controller.ts
vol_main_routes.get("/volunteer_profile", vol_profile_controller.vol_profile_info);
vol_main_routes.put("/volunteer_profile_update/:id", vol_profile_controller.vol_profile_info);

// from  ../controllers/volunteer/vol_post_controller.ts
vol_main_routes.get("/volunteer_post", vol_post_controller.vol_post);
vol_main_routes.delete("/volunteer_post/:id", vol_post_controller.vol_post);
vol_main_routes.post("/volunteer_post_create", vol_post_controller.vol_post);
vol_main_routes.get("/volunteer_post_info/:id", vol_post_controller.vol_post_info);
vol_main_routes.put("/volunteer_post_update/:id", vol_post_controller.vol_post_info);

// from  ../controllers/volunteer/vol_case_controller.ts
vol_main_routes.get("/volunteer_case", vol_case_controller.vol_case);
vol_main_routes.get("/volunteer_case_info/:id", vol_case_controller.vol_case_info);
vol_main_routes.post("/volunteer_case_accept", vol_case_controller.vol_case_accept);
vol_main_routes.post("/volunteer_case_reject", vol_case_controller.vol_case_reject);

// from  ../controllers/volunteer/vol_event_controller.ts
vol_main_routes.get("/volunteer_case_event/:id", vol_event_controller.vol_event_edit);
vol_main_routes.post("/volunteer_case_event/:id", vol_event_controller.vol_event_edit);