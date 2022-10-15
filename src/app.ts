// import dotenv
import 'dotenv/config';

// import express
import express, { Request, Response, NextFunction } from 'express';

// Initialize express
const app: express.Application = express();

// Port
const address = '0.0.0.0:8000';
const PORT = process.env.PORT || 3000;

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define index route
app.get('/', async (req: Request, res: Response, next: NextFunction) => {
    res.send('Welcome to DeliveryCog');
});

// Listen for server connections
const server = app.listen(PORT, () =>
    console.log(`server running on ${address}`)
);

export default server;
