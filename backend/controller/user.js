const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken')
const User = require('../model/user');
const { upload } = require('../multer');
const ErrorHandler = require('../middleware/error');
const fs = require('fs');
const sendMail = require('../utils/SendMail');
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
    return jwt.sign(user, process.env.ACTIVATION_SECRET, {
        expiresIn: "5m",
    });
}

//
module.exports = router
