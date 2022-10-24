// import dotenv
import 'dotenv/config';
// import express
import express, { Request, Response, NextFunction } from 'express';

import swaggerDoc from 'swagger-ui-express';
import swaggerDocumentation from './APIs/Routes/Doc/Helpers/Documentations';

import errorHandler from './APIs/Controllers/Errors/errorHandler';
import AppError from './Services/Errors/appError';

import routes from './APIs/Routes/index';

// Initialize express
const app: express.Application = express();

// Port
const PORT = process.env.PORT || 3000;
const address = `0.0.0.0:${PORT}`;

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/documentation', swaggerDoc.serve);
app.use('/api/v1/documentation', swaggerDoc.setup(swaggerDocumentation));

// Define index route
app.get('/', async (req: Request, res: Response) => {
    res.contentType('json');
    res.json({ status: 'ok', message: 'Welcome to DeliveryCog' });
});

// Routes
routes(app);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`can't find ${req.originalUrl} on server!`, 404));
});

app.use(errorHandler);

// Listen for server connections
const server = app.listen(PORT, () =>
    console.log(`server running on ${address}`)
);

export default server;
