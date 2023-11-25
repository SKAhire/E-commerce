const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken');
const User = require("../model/user");

exports.isAuthenticated = catchAsyncError(async(res, req, next) => {
    const {token} = req.cookie;

    if(!token){
        return next(new ErrorHandler("Please login to continue", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    req.user = await User.findById(decoded.id);
    
    next();
});
