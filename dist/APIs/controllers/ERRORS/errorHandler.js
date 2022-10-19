"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const sendErrorDev = (err, res) => {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
        success: err.statusCode,
        message: err.message,
        error: err,
        stack: err.stack,
        name: err.name,
    });
};
const sendErrorProd = (err, res) => {
    const statusCode = err.statusCode || 500;
    if (err.isOperational) {
        res.status(statusCode).json({
            success: false,
            message: err.message,
            name: err.name,
            operation: err.isOperational,
        });
    }
};
const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (process.env.ENV === 'development') {
        sendErrorDev(err, res);
    }
    if (process.env.ENV === 'production') {
        sendErrorProd(err, res);
        const error = Object.assign({}, err);
        if (error.name === 'ExpiredCodeException') {
            const { message } = error;
            const status = error.statusCode || 401;
            return res.status(status).json({
                success: false,
                message,
            });
        }
        if (error.name === 'Error') {
            res.status(error.statusCode || 401);
            return res.json({
                success: false,
                message: error.message,
            });
        }
        if (error.name === 'NotAuthorizedException') {
            const status = error.statusCode || 401;
            return res.status(status).json({
                success: false,
                error: error.message,
            });
        }
    }
    else {
        return res.status(err.statusCode || 400).json({
            success: false,
            error: err.message,
            message: 'Something went wrong, please contact Admin',
        });
    }
};
exports.default = errorHandler;
