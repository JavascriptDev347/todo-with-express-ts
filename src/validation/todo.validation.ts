import Joi from "joi";
// current date without seconds
const now = new Date();
export const createTodoValidation = Joi.object({
    name: Joi.string().min(4).max(36).required(),
    description: Joi.string().min(4).max(250).required(),
    tags: Joi.array()
        .items(Joi.string().min(1).max(30)) // har element string, 1-30 char
        .min(1)                              // kamida 1 tag bo‘lishi shart
        .unique()                             // takror element yo‘q
        .required(),

    // date must be today or future
    date: Joi.date()
        .iso()
        .min(new Date(new Date().setHours(0, 0, 0, 0))) // bugungi sanadan oldin bo'lmasin
        .required()
        .messages({
            "date.base": `"date" must be a valid date`,
            "date.iso": `"date" must be in YYYY-MM-DD format`,
            "date.min": `"date" cannot be in the past`,
            "any.required": `"date" is required`
        }),
    // time as string HH:mm
    time: Joi.string()
        .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .required()
        .custom((value, helpers) => {
            const [hours, minutes] = value.split(":").map(Number);

            const { date } = helpers.state.ancestors[0]; // req.body.date
            const todoDate = new Date(date);
            todoDate.setHours(hours, minutes, 0, 0);

            const now = new Date();
            const diffHours = (todoDate.getTime() - now.getTime()) / (1000 * 60 * 60);

            if (diffHours < 2) {
                // ✅ string emas, object qaytarish kerak
                return helpers.error("any.custom");
            }

            return value;
        })
        .messages({
            "any.custom": "time must be at least 2 hours from now",
            "string.pattern.base": "time must be in HH:mm format",
            "any.required": "time is required",
        }),




})