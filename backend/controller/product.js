const express = require('express')
const router = express.Router();
const Product = require('../model/product');
const Shop = require('../model/shop')
const { upload } = require('../multer')
const catchAsyncError = require('../middleware/catchAsyncError')
const ErrorHandler = require("../utils/ErrorHandler");
const { isShopAuthenticated, isAuthenticated } = require('../middleware/auth');
const Order = require("../model/order");

// create product
router.post("/create-product", upload.array("images"), catchAsyncError(async (req, res, next) => {
    try {
        const shopId = req.body.shopId;
        const shop = await Shop.findById(shopId);
        if (!shop) {
            return next(new ErrorHandler("Shop Id is invalid!", 400));
        } else {
            const files = req.files;
            const imageUrls = files.map((file) => `${file.filename}`);
            const productData = req.body;
            productData.images = imageUrls;
            productData.shop = shop;

            const product = await Product.create(productData)
            res.status(201).json({
                success: true,
                product,
            })

        }

    } catch (error) {
        return next(new ErrorHandler(error, 400))
    }
}));

// get all products of a shop
router.get("/get-all-products-shop/:id", catchAsyncError(async (req, res, next) => {
    try {
        const product = await Product.find({ shopId: req.params.id })

        res.status(200).json({
            success: true,
            product,
        })
    } catch (error) {
        return next(new ErrorHandler(error, 400))
    }
}))

// delete products of a shop
router.delete("/delete-shop-product/:id", isShopAuthenticated, catchAsyncError(async (req, res, next) => {
    try {
        const productId = req.params.id;

        const productData = await Product.findById(productId);

        productData.images.forEach((imageUrls) => {
            const filename = imageUrls;
            const filePath = `uploads/${filename}`
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        });

        const product = await Product.findByIdAndDelete(productId)

        if (!product) {
            return next(new ErrorHandler("Product not Found!", 400))
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
        })
    } catch (error) {
        return next(new ErrorHandler(error, 400))
    }
}))

// get all products
router.get(
    "/get-all-products",
    catchAsyncError(async (req, res, next) => {
        try {
            const product = await Product.find().sort({createdAt: -1});

            res.status(201).json({
                success: true,
                product,
            });
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);

// review for a product
router.put(
    "/create-new-review",
    isAuthenticated,
    catchAsyncError(async (req, res, next) => {
        try {
            const { user, rating, comment, productId, orderId } = req.body;

            const product = await Product.findById(productId);
            const review = {
                user,
                rating,
                comment,
                productId,
            };

            const isReviewed = product.reviews.find(
                (rev) => rev.user._id === req.user._id
            );

            if (isReviewed) {
                product.reviews.forEach((rev) => {
                    if (rev.user._id === req.user._id) {
                        (rev.rating = rating), (rev.comment = comment), (rev.user = user);
                    }
                });
            } else {
                product.reviews.push(review);
            }

            let avg = 0;

            product.reviews.forEach((rev) => {
                avg += rev.rating;
            });

            product.ratings = avg / product.reviews.length;

            await product.save({ validateBeforeSave: false });

            await Order.findByIdAndUpdate(
                orderId,
                { $set: { "cart.$[elem].isReviewed": true } },
                { arrayFilters: [{ "elem._id": productId }], new: true }
            );

            res.status(200).json({
                success: true,
                message: "Reviwed succesfully!",
            });
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);

module.exports = router;