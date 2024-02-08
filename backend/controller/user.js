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
const bcrypt = require('bcryptjs');
const { isAuthenticated } = require('../middleware/auth');
const user = require('../model/user');

// create user
router.post('/create-user', upload.single('file'), async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const userEmail = await User.findOne({ email });

        if (userEmail) {
            const filename = req.file.filename;
            const filePath = `uploads/${filename}`;
            fs.unlink(filePath, (err) => {
                if (err) {
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
                subject: "Activate your ShopNow account.",
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

//active user
router.post("/activation", catchAsyncError(async (req, res, next) => {
    try {
        const { activationToken } = req.body;
        const newUser = jwt.verify(activationToken, process.env.ACTIVATION_SECRET);

        if (!newUser) {
            return next(new ErrorHandler("Invalid Token", 400))
        }


        const { name, email, password, avatar } = newUser;
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({
                name,
                email,
                avatar,
                password,
            });

            sendToken(user, 201, res)

        } else {
            return next(new ErrorHandler("User already exists!", 400));
        }



    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}));



// user login

router.post("/login-user", catchAsyncError(async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new ErrorHandler("Please provide valid credentials!", 400))
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return next(new ErrorHandler("User doesn't exist!", 400))
        }

        // const passValid = user.comparePassword(password);
        const passValid = await bcrypt.compare(password, user.password);


        if (!passValid) {
            return next(new ErrorHandler("Please provide valid credentials!", 400))
        }

        sendToken(user, 201, res)


    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}));

//load user

router.get("/get-user", isAuthenticated, catchAsyncError(async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        if (!user) {
            return next(new ErrorHandler("User doesn't exist!", 400))
        }

        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}))

// logout user
router.get("/logout", isAuthenticated, catchAsyncError(async (req, res, next) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        })

        res.status(201).json({
            success: true,
            message: "Logout Successfull!"
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}))

// update user information
router.put("/update-user-info", isAuthenticated, catchAsyncError(async (req, res, next) => {
    try {
        const { email, phoneNumber, name, password } = req.body;

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return next(next(new ErrorHandler("User not found!", 400)));
        }

        const passValid = await bcrypt.compare(password, user.password);


        if (!passValid) {
            return next(new ErrorHandler("Please provide valid credentials!", 400))
        }

        user.name = name;
        user.email = email;
        user.phoneNumber = phoneNumber;

        await user.save();

        res.status(201).json({
            success: true,
            user
        });

    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}))

// updating user avatar
router.put(
    "/update-avatar",
    isAuthenticated,
    upload.single("image"),
    catchAsyncError(async (req, res, next) => {
        try {
            const existsUser = await User.findById(req.user.id);

            const existAvatarPath = `uploads/${existsUser.avatar}`;

            fs.unlinkSync(existAvatarPath);

            const fileUrl = path.join(req.file.filename);

            const user = await User.findByIdAndUpdate(req.user.id, {
                avatar: fileUrl,
            });

            res.status(200).json({
                success: true,
                user,
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);

// update user addresses
router.put(
    "/update-user-addresses",
    isAuthenticated,
    catchAsyncError(async (req, res, next) => {
        try {
            const user = await User.findById(req.user.id);

            const sameTypeAddress = user.addresses.find(
                (address) => address.addressType === req.body.addressType
            );
            if (sameTypeAddress) {
                return next(
                    new ErrorHandler(`${req.body.addressType} address already exists`)
                );
            }

            const existsAddress = user.addresses.find(
                (address) => address._id === req.body._id
            );

            if (existsAddress) {
                Object.assign(existsAddress, req.body);
            } else {
                // add the new address to the array
                user.addresses.push(req.body);
            }

            await user.save();

            res.status(200).json({
                success: true,
                user,
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);

// delete user address
router.delete(
    "/delete-user-address/:id",
    isAuthenticated,
    catchAsyncError(async (req, res, next) => {
        try {
            const userId = req.user._id;
            const addressId = req.params.id;

            // console.log(addressId);

            await User.updateOne(
                {
                    _id: userId,
                },
                { $pull: { addresses: { _id: addressId } } }
            );

            const user = await User.findById(userId);

            res.status(200).json({ success: true, user });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);

// update user password
router.put(
    "/update-user-password",
    isAuthenticated,
    catchAsyncError(async (req, res, next) => {
      try {
        const user = await User.findById(req.user.id).select("+password");
  
        const isPasswordMatched = await bcrypt.compare(req.body.oldPassword, user.password);
  
        if (!isPasswordMatched) {
          return next(new ErrorHandler("Old password is incorrect!", 400));
        }
  
        if (req.body.newPassword !== req.body.confirmPassword) {
          return next(
            new ErrorHandler("Password doesn't matched with each other!", 400)
          );
        }
        user.password = req.body.newPassword;
  
        await user.save();
  
        res.status(200).json({
          success: true,
          message: "Password updated successfully!",
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );

  // find user information with the userId
router.get(
    "/user-info/:id",
    catchAsyncError(async (req, res, next) => {
      try {
        const user = await User.findById(req.params.id);
  
        if(!user){
            console.log("no user found")
        }
        res.status(201).json({
          success: true,
          user,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );

module.exports = router
