import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import {UserModel} from '../models/userModel';
dotenv.config();
const router = express.Router();
router.put('/login', async (req, res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email: email, password: password});
    if (user) {
        const jwtToken = jwt.sign(
            {email: email, exp: Math.floor(Date.now() / 1000) + 60 * 60},
            (process.env.JWT_SECRET_KEY as string) ||
                'my-32-character-ultra-secure-and-ultra-long-secret',
        );
        res.json({message: 'Welcome back!', token: jwtToken, user: user});
    } else {
        res.status(401).json({
            message: 'Invalid credentials!',
        });
    }
});

router.post('/register', async (req, res) => {
    const {name, dob, email, password} = req.body;
    const age = new Date().getFullYear() - new Date(dob).getFullYear();
    const user = await UserModel.findOne({email: email, password: password});
    if (user) {
        res.status(400).json({message: 'User already exists!'});
    } else {
        const user = await UserModel.create({name, age, email, password});
        res.status(200).json({
            message: 'User created successfully!',
            user: user,
        });
    }
});
router.get('/info', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const secretKey = process.env.JWT_SECRET_KEY as string;
        jwt.verify(token as string, secretKey, (err, decoded) => {
            if (err) {
                res.status(401).json({message: 'Invalid token!'});
            } else {
                console.log('Jwt verified successfully');
                console.log(decoded);
                const email = (decoded as {email: string}).email;
                console.log(email);
                res.json({message: 'Valid token!', email: email});
            }
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({message: 'Server error!'});
    }
});
export default router;
