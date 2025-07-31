import 'reflect-metadata';
import dotenv from 'dotenv';
import { AppDataSource } from './data-source';
import app from './app';

dotenv.config();

const port = process.env.PORT || 3000;
const apiVersion = process.env.API_VERSION || '/api/v1';

AppDataSource.initialize()
    .then(() => {
        console.log('📦 Database connected');
        app.listen(port, () => {
            console.log(`🚀 Server running on http://localhost:${port}${apiVersion}`);
        });
    })
    .catch((error) => {
        console.error('❌ Error during Data Source initialization', error);
    });
