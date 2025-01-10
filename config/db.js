const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
        console.error("Error connecting to MongoDB", err);
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
module.exports = mongoose;