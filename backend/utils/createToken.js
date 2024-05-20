import jwt from 'jsonwebtoken';

const generateToken = (response, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

    // Set JWT as an HTTP-Only cookie
    response.cookie('jwToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', //Utilizzo di cookie sicuri in produzione
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 giorni
    });

    return token;
}

export default generateToken;
