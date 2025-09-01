const errorHandler = (err, request, response, next) => {
    const statusCode = err.statusCode || 500

    response.status(statusCode).json({
        message: err.message,
        stack: err.stack,
    })
}

export default errorHandler