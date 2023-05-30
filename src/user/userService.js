import prisma from '../db/index.js';

export const registerUser = async (username, email, password) => {
   
       const existingUser =  await prisma.user.findUnique({
            where:{
                email
            }
        })

        if(existingUser){
            throw new Error('User already exist')
        }

        const user = await prisma.user.create({
            data:{
                username,
                email, 
                password
            }
        })

        return user;
}

export const loginUser = async (email, password) => {
 
        const user = await prisma.user.findUnique({
            where:{
                email
            }
        })

        if(!user){
            throw new Error("User not found")
        }

        if(user.password !== password){
            throw new Error("Invalid password")
        }

        return user
}