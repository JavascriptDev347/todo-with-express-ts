import type { Request, Response } from 'express';
import TodoService from "../service/todo.service.ts";
import { createTodoValidation } from '../validation/todo.validation.ts';
import type { ITodoRequest } from '../interfaces/ITodo.ts';
import Errors, { HttpCode } from '../libs/Error.ts';

const todoService = new TodoService();

export const getAllTodos = async (req: Request, res: Response) => {
    try {
        const result = await todoService.getAllTodos();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export const createTodo = async (req: Request, res: Response) => {
    try {
        const value = await createTodoValidation.validateAsync(req.body);
        const input: ITodoRequest = value;
        await todoService.createTodo(input, req.user.id);
        return res.status(201).json({ success: true, message: "New todo created successfully !!!" });
    } catch (error) {
        // 1️⃣ Joi validation error
        if (error.isJoi) {
            return res.status(HttpCode.BAD_REQUEST).json({
                code: HttpCode.BAD_REQUEST,
                message: error.message,
            });
        }

        // 2️⃣ Custom error throw qilingan
        if (error instanceof Errors) {
            return res.status(error.code).json(error);
        }

        // 3️⃣ Generic server error
        return res.status(HttpCode.INTERNAL_SERVER_ERROR).json(Errors.standart);
    }
}

export const updateTodo = async (req: Request, res: Response) => {
    try {

        const id = req.params.id as string;
        const { success, message } = await todoService.updateTodo(id, req.body);
        res.status(200).json({ success, message });
    } catch (error) {
        // 1️⃣ Joi validation error
        if (error.isJoi) {
            return res.status(HttpCode.BAD_REQUEST).json({
                code: HttpCode.BAD_REQUEST,
                message: error.message,
            });
        }

        // 2️⃣ Custom error throw qilingan
        if (error instanceof Errors) {
            return res.status(error.code).json(error);
        }

        // 3️⃣ Generic server error
        return res.status(HttpCode.INTERNAL_SERVER_ERROR).json(Errors.standart);
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