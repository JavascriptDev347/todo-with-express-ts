export interface ITodoResponse {
    name: string;
    description: string;
    tags: Array<string>;
    time: string;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface ITodoRequest {
    name: string;
    description: string;
    tags: Array<string>;
    time: string;
    date: Date;
}

export interface IResponse {
    success: boolean;
    message: string;
}