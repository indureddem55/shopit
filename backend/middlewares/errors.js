const ErrorHandler = require('../utils/ErrorHandler');

module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;

    err.message = err.message || 'Internal Server Error';

    if(process.env.NODE_ENV === 'DEVELOPMENT')
    {
        res.status(err.statusCode).json({
            success: false,
            error:err,
            errMessage:err.message,
            stack:err.stack

        })
    }

    if(process.env.NODE_ENV === 'PRODUCTION')
    {
        let error = {...err}
        
        error.message = err.message

        //Handling wrong object ID error
        if(err.name === "CastError"){

            const message = 'resource not found.Invalid: ${err.path}'

            error = new ErrorHandler(message,400);
        }

        //handling mangoose validation error

        if(err.name === 'validationError'){
            const message = Object.values(error.errors).map(value => value.message);
            error = new ErrorHandler(message,400);
        }

        res.status(error.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error'
        })
    }

}