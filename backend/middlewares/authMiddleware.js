import jwt, { decode } from 'jsonwebtoken'//controlliamo la presenza del token per effettuare login e ogout
import User from '../models/userModel.js'//verifichiamo credenziali user
import asyncHandler from './asyncHandler.js'//per gli errori:
import { response } from 'express';



const authenticate = asyncHandler(async(request,response,next)=>{
    let token;

    //read jsonwebtoken from the 'jwToken' cookie
    token = request.cookies.jwt

    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            request.user = await User.findById(decoded.userId).select("-password")
            next();
        } catch (error) {
            response.status(401);
            throw new Error("NON SEI AUTORIZZATO, TOKEN FAILED")
        }
    }else{
        response.status(401);
        throw new Error("NON SEI AUTORIZZATO, NESSUN TOKEN ESISTENTE")
    }

})


const authorizeAdmin = (request,response,next)=>{
    if(request.user && request.user.isAdmin){
        next();

    }else{
        response.status(401).send("NON SEI UN ADMIN")
    }
        

}

export {authorizeAdmin ,authenticate }









