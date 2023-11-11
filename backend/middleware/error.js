const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error!"

    // Wrong mongodb id error
    if(err.name === "CastError"){
        const message = `Resources not found with the id. Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // Duplicate Key error
    if(err.code === 11000){
        const message = `Duplicate key ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }

    // Wrong JWT error
    if(err.name === "JsonWebTokenError"){
        const message = "Your url is invalid please try again!";
        err = new ErrorHandler(message, 400);
    }

    // JWT exprired
    if(err.name === "TokenExpiredError"){
        const message = "Your url expired please try again letter!";
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}