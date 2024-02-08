const express = require('express')
const router = express.Router()
const catchAsyncError = require("../middleware/catchAsyncError");
const Conversation = require("../model/conversation");
const ErrorHandler = require("../utils/ErrorHandler");
const { isShopAuthenticated, isAuthenticated } = require('../middleware/auth');

// create new conversation

router.post("/create-new-conversation", catchAsyncError(async (req, res, next) => {
    try {
        const { groupTitle, userId, shopId } = req.body;
        const conversationExists = await Conversation.findOne({ groupTitle })

        if (conversationExists) {
            const conversation = conversationExists
            res.status(201).json({
                successs: true,
                conversation
            })
        } else {
            const conversation = await Conversation.create({
                members: [userId, shopId],
                groupTitle: groupTitle,
            })

            res.status(201).json({
                successs: true,
                conversation
            })
        }

    } catch (error) {
        return next(new ErrorHandler(error.response.message), 500)
    }
}))

router.get("/get-all-shop-conversation/:id", isShopAuthenticated, catchAsyncError(async (req, res, next) => {
    try {
        const conversation = await Conversation.find({
            members: {
                $in: [req.params.id],
            },
        }).sort({ updatedAt: -1, createdAt: -1 })
        res.status(201).json({
            successs: true,
            conversation
        })
    } catch (error) {
        return next(new ErrorHandler(error), 500)
    }
}))

router.get("/get-all-user-conversation/:id", isAuthenticated, catchAsyncError(async (req, res, next) => {
    try {
        const conversation = await Conversation.find({
            members: {
                $in: [req.params.id],
            },
        }).sort({ updatedAt: -1, createdAt: -1 })
        res.status(201).json({
            successs: true,
            conversation
        })
    } catch (error) {
        return next(new ErrorHandler(error), 500)
    }
}))

router.get("/get-all-shop-conversation/:id", isShopAuthenticated, catchAsyncError(async (req, res, next) => {
    try {
        const conversation = await Conversation.find({
            members: {
                $in: [req.params.id],
            },
        }).sort({ updatedAt: -1, createdAt: -1 })
        res.status(201).json({
            successs: true,
            conversation
        })
    } catch (error) {
        return next(new ErrorHandler(error), 500)
    }
}))

// update the last message
router.put(
    "/update-last-message/:id",
    catchAsyncError(async (req, res, next) => {
        try {
            const { lastMessage, lastMessageId } = req.body;

            const conversation = await Conversation.findByIdAndUpdate(req.params.id, {
                lastMessage,
                lastMessageId,
            });

            res.status(201).json({
                success: true,
                conversation,
            });
        } catch (error) {
            return next(new ErrorHandler(error), 500);
        }
    })
);


module.exports = router;