import { Router } from "express";
import AuthController from "../controller/AuthController.js";
import authMiddleware from "../middleware/AuthMiddleware.js";
const router = Router();

router.post("/auth/signup", AuthController.signup);

router.post("/auth/login", AuthController.login);

router.get("/auth/user", authMiddleware,AuthController.user);


export default router;