const express = require('express')
const router = express.Router();
const Coupon = require('../model/coupon');
const Shop = require('../model/shop')
const catchAsyncError = require('../middleware/catchAsyncError')
const ErrorHandler = require("../utils/ErrorHandler");
const { isShopAuthenticated } = require('../middleware/auth');

// create coupon
router.post("/create-coupon", catchAsyncError(async (req, res, next) => {
    try {
        const couponName = req.body.name;
        const couponExists = await Coupon.find({name: couponName});
        if (!couponExists) {
            return next(new ErrorHandler("Coupon Code is invalid!", 400));
        } else {
            const couponData = req.body;

            const coupon = await Coupon.create(couponData)
            res.status(201).json({
                success: true,
                coupon,
            })

        }

    } catch (error) {
        return next(new ErrorHandler(error, 400))
    }
}));

// get all coupon of a shop
router.get("/get-coupons/:id", catchAsyncError(async (req, res, next) => {
    try {
        const coupon = await Coupon.find({ shopId: req.params.id })

        res.status(200).json({
            success: true,
            coupon,
        })
    } catch (error) {
        return next(new ErrorHandler(error, 400))
    }
}))

// delete coupon of a shop
router.delete("/delete-coupon/:id", isShopAuthenticated, catchAsyncError(async (req, res, next) => {
    try {
        const couponId = req.params.id;

        const coupon = await Coupon.findByIdAndDelete(couponId)
        if (!coupon) {
            return next(new ErrorHandler("Coupon not Found!", 400))
        }

        res.status(200).json({
            success: true,
            message: "Coupon deleted successfully!",
        })
    } catch (error) {
        return next(new ErrorHandler(error, 400))
    }
}))

module.exports = router;