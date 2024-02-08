const express = require('express')
const router = express.Router()
const catchAsyncError = require("../middleware/catchAsyncError");
const Message = require("../model/message");
const ErrorHandler = require("../utils/ErrorHandler");
const { upload } = require('../multer');

// create new message

router.post("/create-new-message", upload.array("images"), catchAsyncError(async (req, res, next) => {
    try {
        const messageData = req.body;

        if (res.files) {
            const files = req.files;
            const imageUrls = files.map((file) => `${file.fileName}`)
            messageData.images = imageUrls
        }

        messageData.conversationId = req.body.conversationId;
        messageData.sender = req.body.sender;
        messageData.text = req.body.text;

        const message = new Message({
            conversationId: messageData.conversationId,
            text: messageData.text,
            sender: messageData.sender,
            images: messageData.images ? messageData.images : undefined,
        })

        message.save();

        res.status(201).json({
            success: true,
            message
        })


    } catch (error) {
        return next(new ErrorHandler(error.response.message), 500)
    }
}))

// get all messages with conversation id
router.get(
    "/get-all-messages/:id",
    catchAsyncError(async (req, res, next) => {
      try {
        const messages = await Message.find({
          conversationId: req.params.id,
        });
  
        res.status(201).json({
          success: true,
          messages,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message), 500);
      }
    })
  );

module.exports = router;