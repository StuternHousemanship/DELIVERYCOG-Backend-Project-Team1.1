import { Application } from 'express';
import authRoutes from './Auth/Authentication';

const routes = (app: Application) => {
    authRoutes(app);
};

export default routes;
