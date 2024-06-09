import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from './Routes/auth.route.js'
import messageRoutes from './Routes/message.route.js'
import userRoutes from './Routes/user.route.js'

import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;



// app.get('/',(req,res) =>{
//     res.send("working fine")
// })

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRoutes)
app.use('/api/message',messageRoutes)
app.use('/api/user',userRoutes)

app.listen(PORT, ()=> {
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`)
})