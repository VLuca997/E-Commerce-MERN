import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from 'bcryptjs/dist/bcrypt.js'



const createUser = asyncHandler(async (request, response) => {
    const {username,password,email} = request.body;
  
if(!username || !password || !email){
    throw new Error("Inserisci tutti gli input");
}
const userExist = await User.findOne({email})
if(userExist){
    response.status(400).send("L'utente gia esiste.");
}

const salt = await bcrypt.genSalt(10);
const hashedPassword =await bcrypt.hash(password,salt)

const newUser = new User({username,email,password: hashedPassword});

try {
    await newUser.save();
    response 
        .status(201)
        .json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin
        })


} catch (error) {
    response.status(400);
    throw new Error("I dati non sono corretti!")

}

});

export { createUser };
