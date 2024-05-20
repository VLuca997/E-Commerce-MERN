//PACKAGES
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

//UTILES
import connectDB from "./config/DB.js";
import userRoutes from './routes/userRoutes.js'
dotenv.config();
const port = process.env.PORT || 5000

connectDB();

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());


//ENDPOINT API TEST POSTMAN!
app.use('/api/users', userRoutes)
app.listen(port, () => console.log(` server running on port : ${port}`))




