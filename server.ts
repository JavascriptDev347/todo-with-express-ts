import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import swaggerUi from "swagger-ui-express";
import router from "./src/routes/router.ts";
import swaggerSpec from "./src/swagger/swagger-docs.ts";
dotenv.config();

const URL = process.env.MONGO_URL;
const PORT = process.env.PORT;

const app = express();

app.use(express.json());

// connect to db and listen
app.listen(PORT, ()=>{
    console.log("Server running on port: " + PORT);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
    mongoose.connect(URL).then(data=>{
        console.log("Connected to MongoDB");

    }).catch(error=>{
        console.log("Connnect to DB error:",error)
    });
});
// router
app.use(router);


app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec));







