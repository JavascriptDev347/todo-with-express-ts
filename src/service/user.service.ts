import type {IUserLoginRequest, IUserRequest, IUserResponse} from "../interfaces/IUser.ts";
import UserSchema from "../schema/user.schema.ts";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

class UserService {
    private readonly userModel;

    constructor() {
        this.userModel = UserSchema;
    }

    public async signUp(input: IUserRequest): Promise<IUserResponse> {

        const existUser = await this.userModel.findOne({email: input.email});
        if (existUser) {
            throw new Error("User already exists");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(input.password, salt);

        const token = jwt.sign({email: input.email}, process.env.SECRET_KEY as string, {
            expiresIn: 8 * 60 * 60
        });

        const user = await this.userModel.create({email: input.email, password: hashedPassword, name: input.name});
        return {user, token}
    }


    public async signIn(input: IUserLoginRequest): Promise<IUserResponse> {
        const existUser = await this.userModel.findOne({email: input.email});
        if (!existUser) {
            throw new Error(`User not found with this email ${input.email}`);
        }

        const isMatch = await bcrypt.compare(input.password, existUser.password);

        if (!isMatch) {
            throw new Error("Incorrect password");
        }

        const payload = {
            id: existUser._id,
            email: existUser.email,
        };
        const token = jwt.sign(payload, process.env.SECRET_KEY as string, {
            expiresIn: 8 * 60 * 60
        });


        return {user: existUser, token};
    }


    public async getMe(email: string) {
        const result = await this.userModel.findOne({email: email});
        if (!result) {
            throw new Error("User not found with this email");
        }

        return result;
    }
}

export default UserService;