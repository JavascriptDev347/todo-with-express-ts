import type { IUserEditRequest, IUserLoginRequest, IUserRequest, IUserResponse } from "../interfaces/IUser.ts";
import generateToken from "../libs/token.ts";
import UserSchema from "../schema/user.schema.ts";
import bcrypt from "bcryptjs"
import Errors, { HttpCode, Message } from "../libs/Error.ts";

class UserService {
    private readonly userModel;

    constructor() {
        this.userModel = UserSchema;
    }

    public async signUp(input: IUserRequest, image_url?: string): Promise<IUserResponse> {

        const existUser = await this.userModel.findOne({ email: input.email });
        if (existUser) {
            throw new Errors(HttpCode.BAD_REQUEST, Message.USED_NICK_PHONE)
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(input.password, salt);

        const user = await this.userModel.create({ email: input.email, password: hashedPassword, name: input.name, profilePicture: image_url });
        const token = generateToken(user._id, input.email, user.role);

        return { user, token }
    }

    public async signIn(input: IUserLoginRequest): Promise<IUserResponse> {
        const existUser = await this.userModel.findOne({ email: input.email }).select("+password -todos").exec();
        if (!existUser) {
            throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
        }

        const isMatch = await bcrypt.compare(input.password, existUser.password);

        if (!isMatch) {
            throw new Errors(HttpCode.BAD_REQUEST, Message.WRONG_PASSWORD);
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
        const todos = await this.userModel.find({ email })
            .select("todos")
            .populate('todos')
            .lean()
            .exec();
        return todos[0].todos || [];
    }

    public async editUserInfo(input: IUserEditRequest, id: string) {

        const user = await this.userModel.findByIdAndUpdate(id, input, { new: true });
        if (!user) {
            throw new Errors(HttpCode.BAD_REQUEST, Message.USER_NOT_FOUND)
        }

        return { user }
    }
}

export default UserService;