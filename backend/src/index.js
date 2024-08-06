import express from 'express';
import config from './core/config.js';
import registerRoutes from './routes/index.js';
import { registerMiddlewares, registerErrorHandlingMiddlewares } from './middlewares/index.js';


const app = express();

registerMiddlewares(app);

registerRoutes(app);

registerErrorHandlingMiddlewares(app);


const server = app.listen(config.PORT, () => {
    
    console.log(`Server is running on http://localhost:${config.PORT}`);
});

process.on('SIGINT', async () => {
    console.log('Server is shutting down...');

    // TODO: implement shutdown logic here in future

    server.close();
});

process.on('SIGTERM', async () => {
    console.log('Received SIGTERM. Shutting down gracefully');

    // TODO: implement shutdown logic here in future

    server.close();
});