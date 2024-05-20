import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from 'bcryptjs';
import generateToken from '../utils/createToken.js';

// creare di un nuovo utente
const createUser = asyncHandler(async (request, response) => {
    const { username, password, email } = request.body;

    if (!username || !password || !email) {
        return response.status(400).json({ message: "Inserisci tutti gli input" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
        return response.status(400).json({ message: "L'utente già esiste." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });

    try {
        await newUser.save();
        generateToken(response, newUser._id);
        return response.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin
        });
    } catch (error) {
        return response.status(400).json({ message: "I dati non sono corretti!" });
    }
});

// Login utente esistente
const loginUser = asyncHandler(async (request, response) => {
    const { email, password } = request.body; 

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        const isPasswordValid = await bcrypt.compare(password, existingUser.password); 
        
        if (isPasswordValid) {
            generateToken(response, existingUser._id);
            return response.status(200).json({
                _id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin
            });
        } else {
            return response.status(401).json({ message: "Credenziali non valide" });
        }
    } else {
        return response.status(401).json({ message: "Credenziali non valide" });
    }
});

//LOGOUT
const logoutCurrentUser = asyncHandler(async (request, response) => {

    response.cookie("jwToken" ,'', {
        httpOnly: true,
        expires: new Date(0),
    })
    response.status(200).json({message: "LOGGED OUT EFFETTUATO CON SUCCESSO"})
})

export { createUser, loginUser, logoutCurrentUser };
