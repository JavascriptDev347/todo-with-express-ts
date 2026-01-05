import Joi from "joi";

export const createUserValidation = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().min(4).max(20).required(),
    password: Joi.string().min(4).max(12).required()
})

export const loginUserValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(12).required()
})


export const editUserValidation = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().min(4).max(20).required()
})
