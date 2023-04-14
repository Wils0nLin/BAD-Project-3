import { dbClient } from "../server";
import express from "express";

export const applyStatusRoute = express.Router();
export const adoptStatusRoute = express.Router();
export const adoptFormRoute = express.Router();
export const pendingCaseRoute = express.Router();
export const userAdoptFromroute = express.Router();

// Get the selected cat detail information
applyStatusRoute.get("/applyStatusData", async (req, res) => {
    const queryResult = await dbClient.query(
        `select *
    from (
          select 
                cat_image.id AS img_id,
                cat_image.c_image AS img,
                adopt_forms.id AS form_id,
                cats.c_name AS cat_name,
                adopt_status AS adopt_status,
                ROW_NUMBER() over(
                      partition by cats.c_name
                      ORDER BY cats.c_name
                ) n
          from cats 
          JOIN adopt_forms ON cats.id = adopt_forms.cat_id
          JOIN users ON adopt_forms.user_id = users.id 
          JOIN cat_image on cat_image.cat_id = cats.id 
          where adopt_forms.user_id = ${req.session.userid}
    ) x
    where n = 1
    ;`
    );

    // const adoptStatus = queryResult.rows[0];
    res.json(queryResult.rows);
});

applyStatusRoute.get("/applyStatusDataVol", async (req, res) => {
    const queryResult = await dbClient.query(
        `select *
    from (
          select 
                cat_image.id AS img_id,
                cat_image.c_image AS img,
                adopt_forms.id AS form_id,
                cats.c_name AS cat_name,
                adopt_status AS adopt_status,
                ROW_NUMBER() over(
                      partition by cats.c_name
                      ORDER BY cats.c_name
                ) n
          from cats 
          JOIN adopt_forms ON cats.id = adopt_forms.cat_id
          JOIN users ON adopt_forms.user_id = users.id 
          JOIN cat_image on cat_image.cat_id = cats.id 
          where cats.volunteer_id = ${req.session.userid}
    ) x
    where n = 1;
    `
    );
    // const adoptStatus = queryResult.rows[0];
    res.json(queryResult.rows);
});

adoptStatusRoute.get("/adoptStatusData", async (req, res) => {
    const queryResult = await dbClient.query(
        `SELECT *, adopt_forms.id AS ad_id FROM adopt_forms
    INNER JOIN cats
    ON cats.id = adopt_forms.cat_id
    INNER JOIN cat_image
    ON cat_image.cat_id = adopt_forms.cat_id
    INNER JOIN adopt_status
    ON adopt_status.id = adopt_forms.adopt_status_id
    WHERE volunteer_id = '${req.session.userid}';`
    );
    // const adoptStatus = queryResult.rows[0];
    res.json(queryResult.rows);
});

adoptFormRoute.get("/adoptFormData", async (req, res) => {
    const queryResult = await dbClient.query(
        `SELECT * FROM adopt_forms
    INNER JOIN home_visit
    ON home_visit.adopt_forms_id = adopt_forms.id;`
    );
    // const adoptForm = queryResult.rows[0];
    res.json(queryResult.rows);
});

pendingCaseRoute.get("/pendingCase", async (req, res) => {
    const queryResult = await dbClient.query(
        `SELECT form_images.f_image,*, adopt_forms.id AS ad_id FROM adopt_forms
        INNER JOIN users
        ON users.id = adopt_forms.user_id
        INNER JOIN cats
        ON cats.id = adopt_forms.cat_id
        INNER JOIN cat_image
        ON cats.id = cat_image.cat_id
        JOIN form_images 
        ON form_images.adopt_forms_id = adopt_forms.id;`
    );
    res.json(queryResult.rows);
});

pendingCaseRoute.get("/pendingCaseData/:caseID", async (req, res) => {
    const queryResult = await dbClient.query(
        ` select * from(select
            events.is_show, 
            events.id,
            events.date,
            events.time,
            cats.age,
            cats.gender,
            cats.c_name,
            cat_image.c_image,
            cats.breed AS breed,
            events.event,
            ROW_NUMBER() over( partition by events.id ORDER BY events.id ) n
            from events
            join adopt_forms ON adopt_forms_id = adopt_forms.id
            join cats ON cats.id = adopt_forms.cat_id
            JOIN cat_image ON cat_image.cat_id = cats.id 
            WHERE adopt_forms_id = ${req.params.caseID})x
            where n = 1`
    );

    res.json(queryResult.rows);
});

pendingCaseRoute.get("/getEvent/:caseID", async (req, res) => {
    const queryResult = await dbClient.query(
        `SELECT * from events where adopt_forms_id = ${req.params.caseID} AND is_select = 'true' ORDER BY date`
    );
    res.json(queryResult.rows);
});

userAdoptFromroute.get("/formPrePlace/:id", async (req, res) => {
    const queryResult = await dbClient.query(
        `SELECT *,cats.id FROM cats
    INNER JOIN cat_image
    ON cats.id = cat_image.cat_id
    WHERE cats.id = ${req.params.id}; `
    );
    res.json(queryResult.rows[0]);
});
