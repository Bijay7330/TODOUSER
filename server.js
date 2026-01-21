import express from 'express';
import { dbConnect } from './src/config/dbConnect.js';
import dotenv from 'dotenv/config';
import userRouter from './src/route/userroute.js';
import todoRouter from './src/route/todoRoute.js';


const app = express();
const port = process.env.port;

app.use(express.json());
app.use('/todo', todoRouter)
app.use('/user',userRouter);

dbConnect()

app.listen(port,()=>{
    console.log(`Server  is connected at port no ${port}`);
})