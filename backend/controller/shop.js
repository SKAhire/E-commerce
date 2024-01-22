const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken')
const Shop = require('../model/shop');
const { upload } = require('../multer');
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require('fs');
const sendMail = require('../utils/SendMail');
const catchAsyncError = require('../middleware/catchAsyncError');
const sendShopToken = require('../utils/shopToken');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { isShopAuthenticated } = require('../middleware/auth');

// Create Shop
router.post('/create-shop', upload.single('file'), async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const shopEmail = await Shop.findOne({ email })

        if (shopEmail) {
            const fileName = req.file.filename;
            const filePath = `uploads/${fileName}`;
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        message: "Error Deleting the File!",
                    })
                }
            })
            return next(new ErrorHandler("Shop already exists!", 400));
        }

        const fileName = req.file.filename;
        const fileUrl = path.join(fileName);

        const shop = {
            name: name,
            email: email,
            password: password,
            avatar: fileUrl,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            zip: req.body.zip,
        }

        const activationToken = createActivationToken(shop);
        const activationUrl = `http://localhost:3000/shop/activation/${activationToken}`;

        try {
            await sendMail({
                email: shop.email,
                subject: "Activate your ShopNow shop.",
                message: `Hello ${shop.name}, please click on the link below to activate your shop account: ${activationUrl}`,
            });

            res.status(201).json({
                success: true,
                message: `Please check your email ${shop.email} to activate your account!`
            })

        } catch (error) {
            return next(new ErrorHandler(error.message, 500))
        }

    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
});

// Create activation toke
const createActivationToken = (shop) => {
    return jwt.sign(shop, process.env.ACTIVATION_SECRET, {
        expiresIn: "5m",
    });
}


//active shop
router.post("/activation", catchAsyncError(async (req, res, next) => {
    try {
        const { activationToken } = req.body;
        const newShop = jwt.verify(activationToken, process.env.ACTIVATION_SECRET);

        if (!newShop) {
            return next(new ErrorHandler("Invalid Token", 400))
        }


        const { name, email, password, avatar, phoneNumber, address, zip } = newShop;
        let shop = await Shop.findOne({ email });
        if (!shop) {
            shop = await Shop.create({
                name,
                email,
                avatar,
                password,
                phoneNumber,
                address,
                zip,
            });

            sendShopToken(shop, 201, res)

        } else {
            return next(new ErrorHandler("Shop already exists!", 400));
        }



    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}));

// shop login

router.post("/login-shop", catchAsyncError(async(req, res, next)=>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return next(new ErrorHandler("Please provide valid credentials!", 400))
        }

        const shop = await Shop.findOne({ email }).select('+password');
        if(!shop){
            return next(new ErrorHandler("User doesn't exist!", 400))
        }

        // const passValid = user.comparePassword(password);
        const passValid = await bcrypt.compare(password, shop.password);


        if(!passValid){
            return next(new ErrorHandler("Please provide valid credentials!", 400))
        }

        sendShopToken(shop, 201, res)


    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}));

//load Shop

router.get("/get-shop", isShopAuthenticated, catchAsyncError(async(req, res, next)=> {
    try {
        console.log(req.shop)
        const shop = await Shop.findById(req.shop.id)
        if(!shop){
            return next(new ErrorHandler("Shop doesn't exist!", 400))
        }

        res.status(200).json({
            success: true,
            shop,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}))

module.exports = router