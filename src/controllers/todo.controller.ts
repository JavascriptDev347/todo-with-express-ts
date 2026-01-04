import type { Request, Response } from 'express';
import TodoService from "../service/todo.service.ts";

const todoService = new TodoService();

export const getAllTodos = async (req: Request, res: Response) => {
    try {
        const result = await todoService.getAllTodos();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ success: false, message: "Something went wrong " + error.message });
    }
}

export const createTodo = async (req: Request, res: Response) => {
    try {
        await todoService.createTodo(req.body, req.user.id);
        return res.status(201).json({ success: true, message: "New todo created successfully !!!" });
    } catch (error) {
        return res.status(400).json({ success: false, message: "Something went wrong " + error.message });
    }
}

export const updateTodo = async (req: Request, res: Response) => {
    try {

        const id = req.params.id as string;
        const { success, message } = await todoService.updateTodo(id, req.body);
        res.status(200).json({ success, message });
    } catch (error) {
        return res.status(400).json({ success: false, message: "Something went wrong " + error.message });
    }
}

export const deleteTodo = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const { success, message } = await todoService.deleteTodo(id);
        res.status(200).json({ success, message });
    } catch (error) {
        return res.status(400).json({ success: false, message: "Something went wrong " + error.message });
    }
}