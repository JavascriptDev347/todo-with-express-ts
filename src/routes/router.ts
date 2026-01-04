import express from "express";
import {createTodo, deleteTodo, getAllTodos, updateTodo} from "../controllers/todo.controller.ts"
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



export default router;