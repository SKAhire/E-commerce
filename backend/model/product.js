const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:{
        type: String,
        require: [true, "Please enter your product name!"],
    },
    description:{
        type: String,
        require: [true, "Please enter your product description!"],
    },
    category:{
        type: String,
        require: [true, "Please enter your product category!"],
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
        require: [true, "Please enter your product price!"],
    },
    stock:{
        type: Number,
        require: [true, "Please enter your product stock!"],
    },
    images:[{
        type: String,
    }],
    shopId:{
        type: String,
        require: true,
    },
    shop:{
        type: String,
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

module.exports = mongoose.model("Product", productSchema);