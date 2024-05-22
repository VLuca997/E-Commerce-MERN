//PACKAGES
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

//UTILES
import connectDB from "./config/DB.js";
//ROUTES
import userRoutes from './routes/userRoutes.js'
import categoryRoutes from './routes/categotyRoutes.js'




dotenv.config();
const port = process.env.PORT || 5000

connectDB();

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

//ROTTE
app.use('/api/users', userRoutes)
app.use('/api/category', categoryRoutes)




//conferma collegamento a mongo
app.listen(port, () => console.log(` server running on port : ${port}`))




