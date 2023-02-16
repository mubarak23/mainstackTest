"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFound = void 0;
const errorHandleMiddleware = (err, req, res, next) => {
    console.log(res.status);
    // const statusCode = res.status ? req.status : 500;
    // res.status(res.status);
    return res.status(Number(res.status)).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : null,
    });
};
exports.default = errorHandleMiddleware;
const notFound = (err, req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};
exports.notFound = notFound;
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};
exports.errorHandler = errorHandler;
