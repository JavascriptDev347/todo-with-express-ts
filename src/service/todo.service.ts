import TodoSchema from "../schema/todo.schema.ts";
import type { IResponse, ITodoRequest, ITodoResponse } from "../interfaces/ITodo.ts";
import UserSchema from "../schema/user.schema.ts";
import CategorySchema from "../schema/category.schema.ts";
import Errors, { HttpCode, Message } from "../libs/Error.ts";
import type { TodoStatus } from "../types/enum/todo-status.enum.ts";

class TodoService {
    private readonly model;
    private readonly userModel;
    private readonly categoryModel;

    constructor() {
        this.model = TodoSchema;
        this.userModel = UserSchema;
        this.categoryModel = CategorySchema;
    }

    public async getAllTodos(): Promise<ITodoResponse[]> {
        return await this.model.find().exec();
    }

    public async createTodo(input: ITodoRequest, id: string): Promise<ITodoResponse> {

        const isCategoryExist = await this.categoryModel.findById(input.categoryId);

        if (!isCategoryExist) {
            throw new Errors(HttpCode.BAD_REQUEST, Message.CATEGORY_ID_NOT_FOUND)
        }

        const todo = await this.model.create({
            name: input.name,
            description: input.description,
            tags: input.tags,
            author: id,
            time: input.time,
            date: input.date,
            categoryId: input.categoryId
        });

        await this.userModel.findByIdAndUpdate(
            id, {
            $push: { todos: todo._id }
        }, {
            new: true
        });

        await this.categoryModel.findByIdAndUpdate(
            input.categoryId, {
            $push: { todos: todo._id }
        }, {
            new: true
        });

        return todo;
    }

    public async deleteTodo(id: string): Promise<IResponse> {
        const r = await this.model.findByIdAndDelete(id);
        if (!r) {
            throw new Error("Id not found");
        }

        return { success: true, message: "Deleted" }
    }

    public async updateTodo(id: string, input: ITodoRequest): Promise<IResponse> {
        const r = await this.model.findByIdAndUpdate(id, input);
        if (!r) {
            throw new Error("Id not found");
        }

        return { success: true, message: "Updated" }
    }

    public async updateTodoStatus(id: string, status: TodoStatus) {
        const updatedTodo = await this.model.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        ).lean();

        if (!updatedTodo) {
            throw new Errors(HttpCode.BAD_REQUEST, Message.NO_DATA_FOUND)
        }

        return updatedTodo;

    }
}

export default TodoService;