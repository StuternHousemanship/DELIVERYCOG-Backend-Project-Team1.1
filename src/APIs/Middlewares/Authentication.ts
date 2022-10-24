import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import AppError from '../../Services/Errors/appError';
import { User } from '../../Models/User';
import GlobalQueries from '../../Repository/globalQueries';

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
            process.env.AccessToken as string
        ) as jwtToken;
        if (!decoded) {
            return next(new AppError('Invalid authorization token', 401));
        }
        const currentUser: User[] = await globalQuery.findOne(
            'users',
            'id',
            decoded.user_id as number
        );
        if (!currentUser) {
            return res.status(401).json({
                message: 'the user belongs to the token nolonger exist.',
                success: false,
            });
        }
        req.user = currentUser;
        next();
    } catch (error) {
        return next(
            new AppError(`something went wrong here is the error ${error}`, 500)
        );
    }
};

export default verifyToken;
