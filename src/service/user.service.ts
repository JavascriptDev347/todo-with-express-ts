import type { IUserLoginRequest, IUserRequest, IUserResponse } from "../interfaces/IUser.ts";
import generateToken from "../libs/token.ts";
import UserSchema from "../schema/user.schema.ts";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { Role } from "../types/enum/role.enum.ts";

class UserService {
    private readonly userModel;

    constructor() {
        this.userModel = UserSchema;
    }

    public async signUp(input: IUserRequest): Promise<IUserResponse> {

        const existUser = await this.userModel.findOne({ email: input.email });
        if (existUser) {
            throw new Error("User already exists");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(input.password, salt);

        const token = generateToken(existUser._id, input.email, existUser.role);

        const user = await this.userModel.create({ email: input.email, password: hashedPassword, name: input.name });
        return { user, token }
    }

    public async signIn(input: IUserLoginRequest): Promise<IUserResponse> {
        const existUser = await this.userModel.findOne({ email: input.email });
        if (!existUser) {
            throw new Error(`User not found with this email ${input.email}`);
        }

        const isMatch = await bcrypt.compare(input.password, existUser.password);

        if (!isMatch) {
            throw new Error("Incorrect password");
        }

        const token = generateToken(existUser._id, input.email, existUser.role);

        return { user: existUser, token };
    }

    public async getMe(email: string) {
        const result = await this.userModel.findOne({ email: email });
        if (!result) {
            throw new Error("User not found with this email");
        }

        return result;
    }

    public async getUserAllTodos(email: string) {
        return await this.userModel.find({ email }).populate('todos');
    }
}

export default UserService;