const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const DB = require("./Backend/Db");
const app = express();
const userRouter = require("./Backend/Routes/userRouter");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/"  , (req , res) => {
    res.send("hello worls..!");
});

app.use("/users" , userRouter);

module.exports = app;