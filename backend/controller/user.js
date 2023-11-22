const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken')
const User = require('../model/user');
const { upload } = require('../multer');
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require('fs');
const sendMail = require('../utils/SendMail');
const catchAsyncError = require('../middleware/catchAsyncError');
const sendToken = require('../utils/jwtToken');
const router = express.Router();

router.post('/create-user', upload.single('file'), async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const userEmail = await User.findOne({ email });

        if (userEmail) {
            const filename = req.file.filename;
            const filePath = `uploads/${filename}`;
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({ message: "Error Deleting the File" })
                }
            })
            return next(new ErrorHandler("User already exists!", 400));
        }

        const filename = req.file.filename;
        const fileUrl = path.join(filename);

        const user = {
            name: name,
            email: email,
            password: password,
            avatar: fileUrl
        }

        const activationToken = createActivationToken(user);
        const activationUrl = `http://localhost:3000/activation/${activationToken}`

        try {
            await sendMail({
                email: user.email,
                subject: "Activate your account.",
                message: `Hello ${user.name}, please click on the link below to activate your account: ${activationUrl}`,
            });
            
            res.status(201).json({
                success: true,
                message: `Please check your email ${user.email} to activate your account!`
            })
        } catch (error) {
            return next(new ErrorHandler(error.message, 500))
        }

    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }

});

// create activation token
const createActivationToken = (user) => {
    return jwt.sign(user, "thisistheactivationkey", {
        expiresIn: "5m",
    });
}

//active user
router.post("/activation", catchAsyncError(async(req, res, next)=>{
    try {
        const {activationToken} = req.body;
        const newUser = jwt.verify(activationToken, "thisistheactivationkey");
        
        if(!newUser){
            return next(new ErrorHandler("Invalid Token", 400))
        }
        console.log("test")

        
        const {name, email, password, avatar} = newUser;
        let user = await User.findOne({email});
        if(user){
            return next(new ErrorHandler("User already exists!", 400))
        }

        user = await User.create({
            name,
            email,
            avatar,
            password,
        });

        sendToken(user, 201, res)

    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}))

module.exports = router
