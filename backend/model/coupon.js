const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const couponSchema = new Schema({
    name:{
        type: String,
        require: [true, "Please enter your coupon name!"],
        unique: true,
    },
    value:{
        type: Number,
        require: true,
    },
    minAmout:{
        type: Number,
    },
    maxAmount:{
        type: Number,
    },
    selectedProducts: {
        type: String,
    },
    shopId:{
        type: String,
        required: true,
       },   
    createdAt:{
        type: Date,
        default: Date.now(),
    },
    
})

module.exports = mongoose.model("Coupon", couponSchema);