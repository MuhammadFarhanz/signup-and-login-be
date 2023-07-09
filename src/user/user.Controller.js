import express from 'express';
import { loginUser, registerUser } from './userService.js';

const router = express.Router()

router.post('/register', async(req,res) => {
    const { username, email, password } = req.body;
    try {
        const user = await registerUser(username,email,password)

        res.status(200).json({message: 'User registered successfully',user})
    } catch (error) {
        // res.status(400).json({ message: error.message });
        res.status(500).send(error.message)
    }
})
 
router.post('/login', async(req,res) => {
    const { email, password } = req.body;

    try {
        const user = await loginUser(email,password)

        res.status(200).json({message: 'User login successfully',user})
    } catch (error) {
        res.status(400).send(error.message)
    }
})


export default router