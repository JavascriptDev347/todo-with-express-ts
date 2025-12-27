import type {Request, Response} from "express";
import UserService from "../service/user.service.ts";

const userService = new UserService();

export const signUp = async (req: Request, res: Response) => {
    try {
        const {user, token} = await userService.signUp(req.body);
        return res.status(201).json({success: true, token, user});
    } catch (error) {
        return res.status(400).json({success: false, message: "Something went wrong " + error.message});
    }
}

export const signIn = async (req: Request, res: Response) => {
    try {
        const {user, token} = await userService.signIn(req.body);
        return res.status(200).json({success: true, token, user});
    } catch (error) {
        return res.status(400).json({success: false, message: "Something went wrong " + error.message});
    }
}

export const getMe = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if(!user) {
            return res.status(404).json({success: false, message: "Not Found"});
        }
        const u = await userService.getMe(user.email);
        return res.status(200).json({success: true, user: u});

    } catch (error) {
        return res.status(400).json({success: false, message: "Something went wrong " + error.message});

    }
}