import TodoSchema from "../schema/todo.schema.ts";
import type {IResponse, ITodoRequest, ITodoResponse} from "../interfaces/ITodo.ts";
import UserSchema from "../schema/user.schema.ts";

class TodoService {
    private readonly model;
    private readonly userModel;

    constructor() {
        this.model = TodoSchema;
        this.userModel = UserSchema;
    }

    public async getAllTodos(): Promise<ITodoResponse[]> {
        return await this.model.find().exec();
    }

    public async createTodo(input: ITodoRequest, id: string): Promise<ITodoResponse> {

        const todo = await this.model.create({
            name: input.name,
            description: input.description,
            tags: input.tags,
            author: id
        });

        await this.userModel.findByIdAndUpdate(
            id, {
                $push: {todos: todo._id}
            }, {
                new: true
            }        );

        return todo;
    }

    public async deleteTodo(id: string): Promise<IResponse> {
        const r = await this.model.findByIdAndDelete(id);
        if (!r) {
            throw new Error("Id not found");
        }

        return {success: true, message: "Deleted"}
    }

    public async updateTodo(id: string, input: ITodoRequest): Promise<IResponse> {
        const r = await this.model.findByIdAndUpdate(id, input);
        if (!r) {
            throw new Error("Id not found");
        }

        return {success: true, message: "Updated"}
    }
}

export default TodoService;