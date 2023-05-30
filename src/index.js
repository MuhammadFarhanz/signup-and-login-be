import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userController from './user/user.Controller.js'
import prisma from './db/index.js';


const app = express()

app.use(express.json())

app.use(cors())

dotenv.config()

const port = process.env.PORT

app.get('/api', async (req, res) => {
  // res.send('Hello World!')
  const users = await prisma.user.findMany() 

  res.send(users) ;
})

app.use("/users", userController)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})