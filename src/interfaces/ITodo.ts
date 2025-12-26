export interface ITodoResponse {
    name:string;
    description:string;
    tags:Array<string>;
    createdAt:Date;
    updatedAt:Date;
}

export interface ITodoRequest {
    name: string;
    description: string;
    tags?: Array<string>;
}

export interface IResponse {
    success:boolean;
    message:string;
}