/* eslint-disable no-unused-vars */
const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({'message': err.message});
};

/* eslint-enable no-unused-vars */
export default errorMiddleware;
