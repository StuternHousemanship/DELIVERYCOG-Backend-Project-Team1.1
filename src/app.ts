// import dotenv
import 'dotenv/config';
// import express
import express, { Application, Request, Response, NextFunction } from 'express';

import routerV1 from './v1/apis/Routes';
import { AppError } from './v1/apis/Utilities/errors/appError';
import errorHandler from './v1/apis/Utilities/errors/errorHandler';

// Initialize express
const app: Application = express();

// Port
const PORT: number = Number(process.env.PORT) || 3000;
const address = `0.0.0.0:${PORT}`;

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define index route
app.get('/', async (req: Request, res: Response) => {
    res.contentType('json');
    res.json({ status: 'ok', message: 'Welcome to DeliveryCog' });
});

// Routes
app.use('/api/v1', routerV1);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`can't find ${req.originalUrl} on server!`, 404));
});

app.use(errorHandler);

// Listen for server connections
const server = app.listen(PORT, () =>
    console.log(`server running on ${address}`)
);

export default server;
