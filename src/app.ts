// import dotenv
import 'dotenv/config';
// import express
import express, { Request, Response } from 'express';

// import authRoutes from './v1/apis/Routes/auth/authentication.router';
import routerV1 from './v1/apis/Routes';

// Initialize express
const app: express.Application = express();

// Port
const PORT = process.env.PORT || 3000;
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

// Listen for server connections
const server = app.listen(PORT, () =>
    console.log(`server running on ${address}`)
);

export default server;
