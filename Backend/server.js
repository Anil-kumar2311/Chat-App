import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from 'path'

import authRoutes from './Routes/auth.route.js'
import messageRoutes from './Routes/message.route.js'
import userRoutes from './Routes/user.route.js'

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const __dirname = path.resolve();

const PORT = process.env.PORT || 5000;


app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRoutes)
app.use('/api/messages',messageRoutes)
app.use('/api/users',userRoutes)
app.use('/api/profile',userRoutes)

app.use(express.static(path.join(__dirname, "/Frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"));
});

server.listen(PORT, ()=> {
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`)
})