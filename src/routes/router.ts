import express from "express";
import {createTodo, deleteTodo, getAllTodos, updateTodo} from "../controllers/todo.controller.ts"
import {getMe, getUserAllTodos, signIn, signUp} from "../controllers/user.controller.ts";
import {authenticateToken} from "../libs/auth.ts";

const router = express.Router();

router
    .get("/all-todos", getAllTodos)

router
    .post("/create-todo", authenticateToken, createTodo)


router
    .put("/edit/:id", updateTodo)

router
    .delete("/delete/:id", deleteTodo);


//  ===== USER =====
router.post("/signup", signUp);
router.post("/login", signIn);
router.get("/get-me",
    authenticateToken,
    getMe
)
router.get("/user/all-todos", authenticateToken,getUserAllTodos);

export default router;