import swaggerJSDoc from "swagger-jsdoc";
const options:swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Todo API",
            version: "1.0.0",
            description: "Todo app uchun REST API",
        },
        servers: [
            {
                url: "http://localhost:4000",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/routes/*.ts",
        "./src/controllers/*.ts"]

}

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;