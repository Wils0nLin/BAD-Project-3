import { dbClient } from "../server";
import express from "express";


export const volInsert = express.Router();


volInsert.post("/REJECT",async (req,res) => {
    console.log(req.body.caseID)
       await dbClient.query(`UPDATE adopt_forms SET adopt_status = 'REJECT' WHERE id=${req.body.caseID}`)
       
    
   
  res.json({message:"success"});
})

volInsert.post("/ACCEPT",async (req,res) => {
    console.log(req.body.caseID)
       await dbClient.query(`UPDATE adopt_forms SET adopt_status = 'ACCEPT' WHERE id=${req.body.caseID}`)
       
    
   
  res.json({message:"success"});
})

volInsert.post("/APPLY",async (req,res) => {
    console.log(req.body)
    for(let BodyObj of req.body){
        console.log(BodyObj)
        let DateAndTime=BodyObj.Date.split("T")
        const id = BodyObj.id
        const Date = DateAndTime[0];
        const Time = DateAndTime[1]
        const event = BodyObj.Event;
        console.log(id,Date,Time,event)  
    dbClient.query("INSERT INTO events(adopt_forms_id,date,time,event) VALUES ($1,$2,$3,$4)",[id,Date,Time,event])
    }
   
  res.json({message:"success"});
})

volInsert.post("/BOOKING/:form_id", async (req,res)=>{
    const form_id = req.params.form_id;
    const event_date = req.body.event_date;
    const title = req.body.title
    const queryResult = await dbClient.query(`INSERT INTO home_visit (form_id,date,title) VALUES ($1,$2,$3);`,[form_id,event_date,title])
    res.json(queryResult);
})