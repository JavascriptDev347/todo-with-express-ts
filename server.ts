import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import swaggerUi from "swagger-ui-express";
import router from "./src/routes/router.ts";
import swaggerSpec from "./src/swagger/swagger-docs.ts";
import userRouter from "./src/routes/user.ts";
import categoryRouter from "./src/routes/category.ts"
import path from "path";
import { fileURLToPath } from "url";
import { startExpiredTodosCron } from './src/libs/utils/crone';


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const URL = process.env.MONGO_URL;
const PORT = process.env.PORT;

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("./uploads"));
app.use(express.json());

// connect to db and listen
app.listen(PORT, () => {
    console.log("Server running on port: " + PORT);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
    mongoose.connect(URL as string).then(data => {
        console.log("Connected to MongoDB");

        startExpiredTodosCron();
    }).catch(error => {
        console.log("Connnect to DB error:", error)
    });
});
// router
app.use(router);
app.use('/user', userRouter)
app.use("/category", categoryRouter)


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));







