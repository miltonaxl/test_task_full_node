import swaggerJSDoc from 'swagger-jsdoc';

export const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: process.env.SWAGGER_TITLE || 'Test CPocket API',
            version: process.env.SWAGGER_VERSION || '1.0.0',
            description: process.env.SWAGGER_DESCRIPTION || 'API documentation for Test CPocket application',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3000}${process.env.API_VERSION || '/api/v1'}`,
                description: 'Development server',
            },
        ],
    },
    apis: ['./src/modules/**/*.routes.ts', './src/modules/**/*.controller.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);
