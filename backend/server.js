import express from "express";
import cors from 'cors'
import {router as authRouter} from'./router/authRouter.js';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import {login} from './router/loginRoute.js'
import {forget} from './router/forget.js'
import {reset} from './router/resetRoute.js'
import {dataBaseConnection} from './database/database.js'
dotenv.config()


const app=express();
app.use(express.json());
app.use(cors());

const PORT=process.env.PORT
const DB_URL=process.env.DB_URL




//connection to db
dataBaseConnection();


//routes
app.use("/api",authRouter);
app.use("/api/register",login);
app.use("/api/forget",forget);
app.use("/api/reset",reset)

app.get("/",(req,res)=>{
    res.status(200).send('server working ');
})



app.listen(PORT,()=>{
    console.log("server running on",PORT);
})