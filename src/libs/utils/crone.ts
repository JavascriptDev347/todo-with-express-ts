import cron from "node-cron";
import todoSchema from "../../schema/todo.schema.ts";
import { TodoStatus } from "../../types/enum/todo-status.enum.ts";

export const startExpiredTodosCron = () => {

    cron.schedule("*/5 * * * *", async () => {
        console.log("Cron is running")
        try {
            const now = new Date();
            const todos = await todoSchema.find({ completed: false });

            todos.forEach(async (todo) => {
                const todoDateTime = new Date(todo.date);
                const [hours, minutes] = todo.time.split(":").map(Number);
                todoDateTime.setHours(Number(hours), minutes, 0, 0);

                if (todoDateTime < now && todo.status !== TodoStatus.EXPIRED) {
                    todo.status = TodoStatus.EXPIRED;
                    await todo.save();
                    console.log(`Todo expired: ${todo._id}`);
                }
            });
        } catch (err) {
            console.error("Cron error:", err);
        }

    })
};