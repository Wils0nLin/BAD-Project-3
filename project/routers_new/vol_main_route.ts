import { volProfileController } from "../server";
// import { vol_post_controller } from "../server";
// import { vol_case_controller } from "../server";
// import { vol_event_controller } from "../server";

import express from "express";

export const vol_main_route = express.Router();

// from  ../controllers/volunteer/vol_profile_controller.ts
vol_main_route.get("/volunteer_profile", volProfileController.vol_profile);
vol_main_route.put("/volunteer_profile_update/:id", volProfileController.vol_profile_edit);

// // from  ../controllers/volunteer/vol_post_controller.ts
// vol_main_route.get("/volunteer_post", vol_post_controller.vol_post);
// vol_main_route.delete("/volunteer_post/:id", vol_post_controller.vol_post);
// vol_main_route.post("/volunteer_post_create", vol_post_controller.vol_post);
// vol_main_route.get("/volunteer_post_info/:id", vol_post_controller.vol_post_info);
// vol_main_route.put("/volunteer_post_update/:id", vol_post_controller.vol_post_info);

// // from  ../controllers/volunteer/vol_case_controller.ts
// vol_main_route.get("/volunteer_case", vol_case_controller.vol_case);
// vol_main_route.get("/volunteer_case_info/:id", vol_case_controller.vol_case_info);
// vol_main_route.post("/volunteer_case_accept", vol_case_controller.vol_case_accept);
// vol_main_route.post("/volunteer_case_reject", vol_case_controller.vol_case_reject);

// // from  ../controllers/volunteer/vol_event_controller.ts
// vol_main_route.get("/volunteer_case_event/:id", vol_event_controller.vol_event);
// vol_main_route.post("/volunteer_case_event/:id", vol_event_controller.vol_event);