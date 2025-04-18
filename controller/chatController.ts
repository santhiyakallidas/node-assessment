import { Request,Response } from "express";
import xlsx from 'xlsx';
import fs from 'fs';
import path from "path";
import { db } from '../models/db';
import { error, timeStamp } from "console";

export const importChart= (req:Request,res:Response)=>{
    const file = req.file;

    if(!file){
        return res.status(400).json({message: 'No file uploaded'})
    }

    const filePath = path.resolve(file.path);
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]]
    const data = xlsx.utils.sheet_to_json(sheet);

    const chats = (data as any[]).map((row)=>{
        return {user_id:row['User ID'],
        message:row['Message'],
        timeStamp:new Date(row['Timestamp'])
        }
    })

    const insertSQL ='INSERT INTO chats (user_id,messges,timestamp) VALUES ?';

    const values = chats.map((chat) =>[chat.user_id,chat.message,chat.timeStamp]);
    db.query(insertSQL,[values],(err,result)=>{
        fs.unlinkSync(filePath);
        if(err){
            return res.status(500).json({messges:'DB Error',error:err})
        }

        res.status(200).json({message:'chats imported successfully',rows:result})
    })

  
}