import { Request,Response } from "express";
import { db } from '../models/db';
import { error } from "console";

export const addTask = (req:Request,res:Response)=>{
    const {title} = req.body;

    if(!title){
        return res.status(400).json({message:'Title is required'})
    }

    const sql= 'INSERT INTO tasks (title) VALUES (?)';
    db.query(sql,[title],(err,result)=>{
        if(err) return res.status(500).json({error:err})

            res.status(201).json({message:'Task added',task:result})
    })
}

export const getTasks = (req:Request,res:Response) => {
    const status = req.query.status;

    let sql = 'SELECT * FROM tasks';
    const params:any[] = [];

    if(status === 'Completed' || status === 'pending'){
        sql +='WHERE status = ?';
        params.push(status);
    }

    db.query(sql,params,(err,result)=>{
        if(err) return res.status(500).json({error:err})

            return res.status(200).json({task:result});
    })
}