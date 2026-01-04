import express from "express";
import { getMe, getUserAllTodos, signIn, signUp } from "../controllers/user.controller.ts";
import { authenticateToken } from "../libs/auth.ts";
import makeUploader from "../libs/utils/uploader.ts";

const router = express.Router();

router.post("/signup", makeUploader("users").single("profilePicture"), signUp);

router.post("/login", signIn);


router.get("/get-me",
    authenticateToken,
    getMe
)
router.get("/all-todos", authenticateToken, getUserAllTodos);

export default router;
