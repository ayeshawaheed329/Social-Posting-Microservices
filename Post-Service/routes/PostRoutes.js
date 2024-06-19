import { Router } from "express";
import PostController from "../controller/PostController.js";
import authMiddleware from "../middleware/AuthMiddleware.js";
const router = Router();


router.get("/getPosts", authMiddleware,PostController.getPosts);
router.post("/createpost", authMiddleware,PostController.createPost);

export default router;