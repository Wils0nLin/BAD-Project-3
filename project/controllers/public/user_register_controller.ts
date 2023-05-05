import type { Request, Response } from "express";
import { hashPassword } from "../../utils/hash";
import { user_register_service } from "../../services/public/user_register_service";

// export const registerRoute = express.Router();

// user_selfProfileEdit.html to modify user information

export class user_register_controller {
    constructor(private user_register_service: user_register_service) {}

    user_register = async (req: Request, res: Response) => {
        try {
            const u_username = req.body.u_username;
            const u_password = req.body.u_password;
            const u_name = req.body.u_name;
            const u_email = req.body.u_email;
            const u_birth_date = req.body.u_birth_date;
            const u_phone_number = req.body.u_phone_number;
            const u_address = req.body.u_address;
            const home_size_id = req.body.home_size_id;
            const income_id = req.body.income_id;
            const existed_pet = req.body.existed_pet;
            const pet_before = req.body.pet_before;
            const is_allergy = req.body.is_allergy;
            const smoker = req.body.smoker;
            const knowledge = req.body.knowledge;
            const future_plan = req.body.future_plan;

            let hashed = await hashPassword(u_password);
            console.log(
                u_username,
                hashed,
                u_password,
                u_name,
                u_email,
                u_birth_date,
                u_phone_number,
                u_address,
                home_size_id,
                income_id,
                existed_pet,
                pet_before,
                is_allergy,
                smoker,
                knowledge,
                future_plan
            );
            console.log("c", u_birth_date);

            await this.user_register_service.user_register(
                u_username,
                hashed,
                u_password,
                u_name,
                u_email,
                u_birth_date,
                u_phone_number,
                u_address,
                home_size_id,
                income_id,
                existed_pet,
                pet_before,
                is_allergy,
                smoker,
                knowledge,
                future_plan
            );
            res.status(200).json({ message: "success" });
        } catch (err) {
            res.status(500).json({ message: "internal server error" });
        }
    };
}

// //Register User
// registerRoute.post("/", async (req, res) => {
//   const u_username = req.body.u_username;
//   const u_password = req.body.u_password;
//   const u_name = req.body.u_name;
//   const u_email = req.body.u_email;
//   const u_birth_date = req.body.u_birth_date;
//   const u_phone_number = req.body.u_phone_number;
//   const u_address = req.body.u_address;
//   const home_size_id = req.body.home_size_id;
//   const income_id = req.body.income_id;
//   const existed_pet = req.body.existed_pet;
//   const pet_before = req.body.pet_before;
//   const is_allergy = req.body.is_allergy;
//   const smoker = req.body.smoker;
//   const knowledge = req.body.knowledge;
//   const future_plan = req.body.future_plan;

//   let hashed = await hashPassword(u_password);

//   //insert users to database users
//   try {
//     const result = await dbClient.query(
//       /*SQL*/
//       `INSERT INTO users (u_username, u_password, u_name, u_email, u_birth_date, u_phone_number ,u_address, home_size_id, income_id, existed_pet, pet_before, is_allergy, smoker, knowledge, future_plan)
//       VALUES ($1, $2, $3 ,$4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
//       RETURNING id`,

//       [
//         u_username,
//         hashed,
//         u_name,
//         u_email,
//         u_birth_date,
//         u_phone_number,
//         u_address,
//         home_size_id,
//         income_id,
//         existed_pet,
//         pet_before,
//         is_allergy,
//         smoker,
//         knowledge,
//         future_plan,
//       ]
//     );

//     res.json(result.rows[0]);
//   } catch (error) {
//     console.error(error);
//     res.sendStatus(500);
//   }
// });

// http://localhost:8080/user_register/user
// registerRoute.get("/user", (req: express.Request, res: express.Response) => {
//   res.end();
// });
