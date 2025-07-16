const { blacklistTokenModel } = require("../models/blacklistToken-model");
const captainModel = require("../models/captain-model");
const jwt = require("jsonwebtoken");

const isCaptain = async(req , res , next) => {
    console.log(req.cookies.token);
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if(!token) {
        return res.status(400).json({ message: "Unauthorized captain" });
    }

    const isblacklisted = await blacklistTokenModel.findOne({ token });

    if(isblacklisted) {
        return res.status(401).json({ message: "Token is blacklisted. Please login again." });
    }

    try{
        const decoded = jwt.verify(token ,process.env.JWT_SECRET);
        const captain = await captainModel.findOne({_id: decoded._id});

        if (!captain) {
            return res.status(404).json({ message: "Captain not found." });
        }

        req.captain = captain;
        next();

    } catch (err) {
        return res.status(401).json({ message: "Unauthorized access", error: err.message });
    }
 }

 module.exports = {
    isCaptain,
 }