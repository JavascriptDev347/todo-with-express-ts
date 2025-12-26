// import type {ITodoResponse} from "../interfaces/ITodo.ts";
import TodoSchema from "../schema/todo.schema.ts";
import type {IResponse, ITodoRequest, ITodoResponse} from "../interfaces/ITodo.ts";

class TodoService {
    private readonly model;
    constructor() {
        this.model = TodoSchema;
    }

    public async getAllTodos(): Promise<ITodoResponse[]> {
        return await this.model.find().exec();
    }

    public async createTodo (input:ITodoRequest):Promise<ITodoResponse> {
        return await this.model.create(input);
    }

    public async deleteTodo (id:string):Promise<IResponse> {
        const r = await this.model.findByIdAndDelete(id);
        if(!r) {
            throw new Error("Id not found");
        }

        return {success:true,message:"Deleted"}
    }

    public async updateTodo (id:string,input:ITodoRequest):Promise<IResponse> {
        const r = await this.model.findByIdAndUpdate(id,input);
        if(!r) {
            throw new Error("Id not found");
        }

        return {success:true,message:"Updated"}
    }
}

export default TodoService;