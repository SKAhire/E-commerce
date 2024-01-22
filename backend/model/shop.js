const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ShopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter shop name!"],
    },
    email: {
        type: String,
        required: [true, "Please enter shop email!"],
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
        minLength: [4, "Password should be greater than 4 characters"],
        select: false,
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    },
    //   addresses: [
    //     {
    //       country: {
    //         type: String,
    //       },
    //       city: {
    //         type: String,
    //       },
    //       address1: {
    //         type: String,
    //       },
    //       address2: {
    //         type: String,
    //       },
    //       zipCode: {
    //         type: Number,
    //       },
    //       addressType: {
    //         type: String,
    //       },
    //     }
    //   ],
    role: {
        type: String,
        default: "seller",
    },
    address: {
        type: String,
        required: true
    },
    zip: {
        type: Number,
        required: true
    },
    avatar: {
        type: String,
        required: true,
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    resetPasswordToken: String,
    resetPasswordTime: Date,
});


//  Hash password
ShopSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

// jwt token
ShopSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};

// compare password
ShopSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Shop", ShopSchema);