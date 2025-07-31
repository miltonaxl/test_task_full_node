import express from 'express';
import swaggerUi from 'swagger-ui-express';
import taskRoutes from './modules/task/task.routes';
import cors from 'cors';
import { swaggerSpec } from './swagger';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Test CPocket API Documentation',
}));

const apiVersion = process.env.API_VERSION || '/api/v1';
app.use(apiVersion, taskRoutes);

export default app;