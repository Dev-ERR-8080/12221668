const express = require("express");
const app = express();
const cors =require('cors');


require("dotenv").config(); 
require('./db')

app.use(cors());
app.use(express.json());

const urlRouter=require("../src/shorturl.router")

// app.get("/", (req, res) => {
//     res.send("hello from backend server");
// });

app.use("/",urlRouter)
//app.use("/shorturls/$id")

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
