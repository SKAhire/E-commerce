const express = require('express')
const router = express.Router();
const Event = require('../model/event');
const Shop = require('../model/shop')
const { upload } = require('../multer')
const catchAsyncError = require('../middleware/catchAsyncError')
const ErrorHandler = require("../utils/ErrorHandler");
const { isShopAuthenticated } = require('../middleware/auth');
const fs = require('fs')

// create event event
router.post("/create-event", upload.array("images"), catchAsyncError(async (req, res, next) => {
    try {
        const shopId = req.body.shopId;
        const shop = await Shop.findById(shopId);
        if (!shop) {
            return next(new ErrorHandler("Shop Id is invalid!", 400));
        } else {
            const files = req.files;
            const imageUrls = files.map((file) => `${file.filename}`);
            const eventData = req.body;
            eventData.images = imageUrls;
            eventData.shop = shop;

            const event = await Event.create(eventData)
            res.status(201).json({
                success: true,
                event,
            })

        }

    } catch (error) {
        return next(new ErrorHandler(error, 400))
    }
}));

// get all events
router.get("/get-all-events", async (req, res, next) => {
    try {
      const event = await Event.find();
      res.status(201).json({
        success: true,
        event,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  });

// get all events of a shop
router.get("/get-all-events-shop/:id", catchAsyncError(async (req, res, next) => {
    try {
        const event = await Event.find({ shopId: req.params.id })

        res.status(200).json({
            success: true,
            event,
        })
    } catch (error) {
        return next(new ErrorHandler(error, 400))
    }
}))

// delete event of a shop
router.delete("/delete-shop-event/:id", isShopAuthenticated, catchAsyncError(async (req, res, next) => {
    try {
        const eventId = req.params.id;

        const eventData = await Event.findById(eventId);
        eventData.images.forEach((imageUrls) => {
            const filename = imageUrls;
            const filePath = `uploads/${filename}`
            console.log(filename)
            fs.unlink(filePath, (err) => {
                if(err){
                    console.log(err);
                }
            });
        });

        const event = await Event.findByIdAndDelete(eventId)
        if (!event) {
            return next(new ErrorHandler("Event not Found!", 400))
        }

        res.status(200).json({
            success: true,
            message: "Event deleted successfully!",
        })
    } catch (error) {
        return next(new ErrorHandler(error, 400))
    }
}))

module.exports = router;