import categorySchema from "../schema/category.schema.ts";
import type { ICategoryRequest, ICategoryResponse } from "../interfaces/ICategory.ts";
import Errors, { HttpCode, Message } from "../libs/Error.ts";
class CategoryService {
    private readonly model;

    constructor() {
        this.model = categorySchema;
    }

    public async getAllCategories() {
        return await this.model.find().select("-todos").exec();
    }

    public async createCategory(input: ICategoryRequest): Promise<ICategoryResponse> {

        const category = await this.model.create({
            name: input.name,
            categoryIcon: input.categoryIcon,
            categoryColor: input.categoryColor
        })

        return category;
    }

    public async getCategoryTodos(id: string) {
        const category = await this.model
            .findById(id)
            .select('todos')
            .populate('todos')
            .lean()
            .exec();

        if (!category) {
            throw new Errors(
                HttpCode.BAD_REQUEST,
                Message.CATEGORY_ID_NOT_FOUND
            );
        }

        return category.todos || [];
    }

    public async editCategory(input: ICategoryRequest, id: string) {
        const category = await this.model.findByIdAndUpdate(id, input, { new: true })
        if (!category) {
            throw new Errors(
                HttpCode.BAD_REQUEST,
                Message.CATEGORY_ID_NOT_FOUND
            );
        }

        return category
    }

    public async deleteCategory(id: string) {
        const category = await this.model.findByIdAndDelete(id)
        if (!category) {
            throw new Errors(
                HttpCode.BAD_REQUEST,
                Message.CATEGORY_ID_NOT_FOUND
            );
        }

    }

}

export default CategoryService;