const userModel = require("../models/user-model");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {blacklistTokenModel} = require("../models/blacklistToken-model");

let isLoggedin = async (req , res , next) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];
    console.log("req.cookie=", token);
    // console.log(req.headers.authorization.split(' ')[ 1 ]);

    if(!token) {
        return res.status(401).json({ message: "Unauthorized" });
        // return res.status(401).json({ message: "not a token" });
    }

    const isblacklisted = await blacklistTokenModel.findOne({token});
    if(isblacklisted) {
        return res.status(401).json({ message: "Token is blacklisted. Please login again." });
    }

    try {
        const decoded = jwt.verify(token ,  process.env.JWT_SECRET);
        const user = await userModel.findOne({_id: decoded._id});
        res.send(user);
        req.user = user;

        next();
    } catch(err) {
        return res.status(401).json({ message: "Unauthorized...!" });
    }
}

module.exports = {
    isLoggedin,
}