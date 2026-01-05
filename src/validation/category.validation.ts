import Joi from "joi";

export const createCategoryValidation = Joi.object({
    name: Joi.string().min(4).required(),
    categoryIcon: Joi.string().optional(),
    categoryColor: Joi.string().optional()
})