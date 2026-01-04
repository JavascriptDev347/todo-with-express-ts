import type { Request, Response } from "express";
import UserService from "../service/user.service.ts";
import { createUserValidation, loginUserValidation } from "../validation/user.validation.ts";
import type { IUserLoginRequest, IUserRequest } from "../interfaces/IUser.ts";
import Errors, { HttpCode } from "../libs/Error.ts";

const userService = new UserService();

export const signUp = async (req: Request, res: Response) => {
    try {
        let image_url = "";
        if (req.file) {
            image_url = req.file.path.replace(/\\/g, "/");
        }
        const value = await createUserValidation.validateAsync(req.body);
        const userInput: IUserRequest = value;

        const { user, token } = await userService.signUp(userInput, image_url);
        return res.status(201).json({ success: true, token, user });
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

export const signIn = async (req: Request, res: Response) => {
    try {
        const value = await loginUserValidation.validateAsync(req.body);
        const userInput: IUserLoginRequest = value;
        const { user, token } = await userService.signIn(userInput);
        return res.status(200).json({ success: true, token, user });
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

export const getMe = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(404).json({ success: false, message: "Not Found" });
        }
        const u = await userService.getMe(user.email);
        return res.status(200).json({ success: true, user: u });

    } catch (error) {
        if (error instanceof Errors) {
            return res.status(error.code).json(error);
        }
        return res.status(HttpCode.INTERNAL_SERVER_ERROR).json(Errors.standart);

    }
}

export const getUserAllTodos = async (req: Request, res: Response) => {
    try {
        const email = req.user.email
        const  todos  = await userService.getUserAllTodos(email)
        return res.status(200).json({ success: true, todos });
    } catch (error) {
        if (error instanceof Errors) {
            return res.status(error.code).json(error);
        }

        return res.status(HttpCode.INTERNAL_SERVER_ERROR).json(Errors.standart);
    }
}