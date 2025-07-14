require('dotenv').config();
const mongoose = require("mongoose");

const connectionString = process.env.MONGODB_URI;
console.log(connectionString);

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Connected to MongoDB");
})
.catch(err => {
    console.log("Error connecting to MongoDB:", err);
});
