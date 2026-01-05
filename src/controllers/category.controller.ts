import type { Request, Response } from "express";
import Errors, { HttpCode } from "../libs/Error.ts";
import CategoryService from "../service/category.service.ts";
import { createCategoryValidation } from "../validation/category.validation.ts";
import type { ICategoryRequest } from "../interfaces/ICategory.ts";

const categoryService = new CategoryService();

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const result = await categoryService.getAllCategories();
        return res.status(200).json({ categories: result });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export const createCategory = async (req: Request, res: Response) => {

    try {
        const value = await createCategoryValidation.validateAsync(req.body);
        const input: ICategoryRequest = value;
        await categoryService.createCategory(input);
        return res.status(201).json({ success: true, message: "New category created successfully !!!" });

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

export const getCategoryTodos = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const todos = await categoryService.getCategoryTodos(id as string);
        return res.status(200).json({ todos: todos });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export const editCategory = async (req: Request, res: Response) => {
    try {
        const value = await createCategoryValidation.validateAsync(req.body);
        const input: ICategoryRequest = value;

        const id = req.params.id;

        await categoryService.editCategory(input, id as string);
        return res.status(201).json({ success: true, message: "Category updated successfully !!!" });

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


export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        await categoryService.deleteCategory(id);
        res.status(200).json({ success: true, message: "Category deleted" });
    } catch (error) {
        return res.status(400).json({ success: false, message: "Something went wrong " + error.message });
    }
}