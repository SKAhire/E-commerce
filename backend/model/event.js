const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name:{
        type: String,
        require: [true, "Please enter your event product name!"],
    },
    description:{
        type: String,
        require: [true, "Please enter your event product description!"],
    },
    category:{
        type: String,
        require: [true, "Please enter your event product category!"],
    },
    start_Date:{
        type: Date,
        require: true,
    },
    finish_Date:{
        type: Date,
        require: true,
    },
    status:{
        type: String,
        default: "Running",
    },
    tags:{
        type: String,
        require: [true, "Please enter your product tags!"],
    },
    originalPrice:{
        type: Number,
    },
    discountPrice:{
        type: Number,
        require: [true, "Please enter your event product price!"],
    },
    stock:{
        type: Number,
        require: [true, "Please enter your event product stock!"],
    },
    images:[{
        type: String,
    }],
    shopId:{
        type: String,
        require: true,
    },
    shop:{
        type: Object,
        require: true,
    },
    sold_out:{
        type: Number,
        default: 0,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    },
    
})

module.exports = mongoose.model("Event", eventSchema);