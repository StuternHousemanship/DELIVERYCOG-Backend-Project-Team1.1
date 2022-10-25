import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../Utilities/errors/appError';
import { User } from '../Models/User';
import GlobalQueries from '../Repository/globalQueries';

const globalQuery = new GlobalQueries();

export interface jwtToken {
    user_id: number;
    iat: number;
    exp: number;
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token;
        if (!req.headers.authorization) {
            return res.status(401).json({
                message:
                    'please provide an authorization header to gain access',
                success: false,
            });
        }
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            return res.status(401).json({
                message: 'Invalid authorization header',
                success: false,
            });
        }
        const decoded = jwt.verify(
            token,
            String(process.env.AccessToken)
        ) as jwtToken;
        if (!decoded) {
            return next(new AppError('Invalid authorization token', 401));
        }
        const currentUser: User = await globalQuery.findOne({
            model: 'users',
            table: 'id',
            value: Number(decoded.user_id),
        });
        if (!currentUser) {
            return res.status(401).json({
                message: 'the user belongs to the token nolonger exist.',
                success: false,
            });
        }
        next();
    } catch (error) {
        return next(
            new AppError(`something went wrong here is the error ${error}`, 500)
        );
    }
};

export default verifyToken;
