import { NextFunction, Request,Response } from "express";
import bcrypt from 'bcryptjs';
import { db } from '../models/db';
import { PassThrough } from "stream";
import { error } from "console";
import { Jwt } from "jsonwebtoken";

const JWT_SECRET = 'secret_key'


export const registerUser = (req:Request,res:Response,next:NextFunction)=>{
    const {name,email,paassword} = req.body;

    if(!name || !email || !paassword){
        return res.status(400).json({message:'Please fill the all the field'});
    }

    const hashedPassword = bcrypt.hashSync(paassword,10);

    const sql ='INSERT INTO users (name,email,password) VALUES(?,?,?)';

    db.query(sql,[name,email,hashedPassword], (err,result)=>{
        if(err){
            if(err.code === 'ER_DUB_ENTRY'){
                return res.status(409).json({message:'Email already registered'});
            }
            return res.status(500).json({message:'Database error',error:err})
        }
        res.status(201).json({messages:'User Registered successfully'})
    });
}

export const loginUser = (req:Request,res:Response)=>{
    const { email, password } =req.body;

    if(!email || !password){
        return res.status(400).json({message: 'Email and password are required'})
    }

    const sql ='SELECT * FROM users WHERE email=?';

    db.query(sql,[email],(err,results)=>{
        if(err) return res.status(500).json({message:'DB error',error:err});

        const user = results;

        const isPasswordValid = bcrypt.compareSync(password,user.password)

        if(!isPasswordValid){
            return res.status(401).json({message:"Invalid password"})
        }

        const token = jwt.sign({id:user.id,email:user.email},JWT_SECRET,{expirein:'1h'})

        res.status(200).json({message:'Login successfull'})
    })
}