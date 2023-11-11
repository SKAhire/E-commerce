const app = require('./app');
const connectDB = require('./db/db_connect')



// Handling uncaught exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server for handling uncaught exception');
});


// Config
if(process.env.NODE_ENV !== 'PRODUCTION'){
    console.log("test1")
    require('dotenv/config')
    // require('dotenv').config({
    //     path: "backend/config/.env"
    // });
}

// Create server
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

//connect db
connectDB();

// Unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server for unhandled promise rejection');

    server.close(() => {
        process.exit(1);
    });
});