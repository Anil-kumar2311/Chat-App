import express, { Router } from 'express';
import {signup,login,logout,update} from '../controllers/auth.controller.js'

const router = express.Router();

router.post("/signup",signup)

router.post("/login",login)

router.post("/logout",logout)

router.post("/update",update)


export default router;