const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const DB = require("./Backend/Db");
const app = express();
const cookieParser = require("cookie-parser");
const userRouter = require("./Backend/Routes/userRouter");
const captainRouter = require("./Backend/Routes/captainRouter");

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/"  , (req , res) => {
    res.send("hello worls..!");
});

app.use("/users" , userRouter);
app.use("/captains", captainRouter);

module.exports = app;