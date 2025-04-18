import mysql from 'mysql2';


export const db =  mysql.createConnection({
    host:'localhost',
    user:'root',
    paassword:'12345',
    database:'assessment'
} as mysql.ConnectionOptions);

try{
     db.connect();
    console.log("connected to mysql database")
} catch(err){
    console.log("connection error",err)
}