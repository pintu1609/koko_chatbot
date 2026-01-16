module.exports.responseHandler = (data, res, message, status) => {
    const statusCode = status || 200;
    res.status(statusCode).json({
        status: statusCode || 200,
        message: message || 'Success',
        data: data
    })
}

module.exports.responseHandlerWith204 = (data, res, message, status) => {
    const statusCode = status || 204;
    res.status(statusCode).json({
        status: statusCode || 204,
        message: message || 'Success',
        data: data

    });
};
module.exports.clientHandler = (data, res, message, status) => {
    const statusCode = status || 400;
    res.status(statusCode).json({
        status: statusCode || 400,
        message: message || 'Failure',
        data: data
    })
}

module.exports.errorHandler = (status, res, message) => {
    const statusCode = status || 500;
    res.status(statusCode).json({
        status: 'error',
        message: message || `Error`
    })
}