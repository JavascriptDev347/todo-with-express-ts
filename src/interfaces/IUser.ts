export interface IUserLoginRequest {
    email: string;
    password: string;
}

export interface IUserRequest  {
    email: string;
    password: string;
    name: string;
}

interface IUser {
    email: string;
    password: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}


export interface IUserResponse {
  token : string;
  user:IUser;
}

export interface UserRequest extends Request {
    user:IUser;
}