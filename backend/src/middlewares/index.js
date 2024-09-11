import express from "express";
import cors from "cors";
import loggerMiddleware from "./logger.middleware.js";
import errorMiddleware from "./error.middleware.js";


const registerMiddlewares = (app) => {
    // define all regular middlewares here;
    app.use(cors())
    app.use(express.json());
    app.use(loggerMiddleware);
};

const registerErrorHandlingMiddlewares = (app) => {
    // define all error handlers here

    app.use(errorMiddleware);
};


export {
    registerMiddlewares,
    registerErrorHandlingMiddlewares
};