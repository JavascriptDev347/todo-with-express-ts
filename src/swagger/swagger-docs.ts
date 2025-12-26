import swaggerJSDoc from "swagger-jsdoc";
const options:swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0', // Specify the OpenAPI version
        info: {
            title: 'Your API Documentation',
            version: '1.0.0',
            description: 'API documentation for your Node.js Express TypeScript application',
        },
        servers: [
            {
                url: 'http://localhost:4000/', // Adjust as needed
                description: 'Development server',
            },
        ],
    },
    apis: ["./src/routes/*.ts",
        "./src/controllers/*.ts"]

}

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;