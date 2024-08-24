import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUserForSideBar,getSearchUserList } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/",protectRoute,getUserForSideBar)
router.get("/search",protectRoute,getSearchUserList)

export default router;