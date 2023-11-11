const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect(process.env.DB_URL).then((data) => {
        console.log(`connected to mongoDB server: ${data.connection.host}`)
    });
}

module.exports = connectDB;