const { blacklistTokenModel } = require("../models/blacklistToken-model");
const CaptainModel = require("../models/captain-model");
const { createCaptain } = require('../services/captainService');
const { validationResult } = require("express-validator");

let registerCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {

        const { fullname, email, password, vehicle } = req.body;

        const existingCaptain = await CaptainModel.findOne({ email });
        if (existingCaptain) {
            return res.status(400).json({ message: "Captain with this Email already registered..!" }); // 409 = Conflict
        }

        const lowervehicle = vehicle.vehicleType.toLowerCase();

        const hashedPassword = await CaptainModel.hashPassword(password);
        console.log(hashedPassword);

        const captain = await createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: lowervehicle
        });



        const token = captain.generateToken();

        res.status(201).json({ 
            token,
            captain 
        });
    }
    catch (err) {
        console.log("Error message", err.message);
        return res.status(500).json({ message: "Server error", error: err.message });
    }

}

let loginCaptain = async(req , res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
    }

    const {email , password} = req.body;

    const captain = await CaptainModel.findOne({email}).select("+password");
    if(!captain) {
        return res.status(401).json({ message: "invalis email " });
    }
    
    console.log("Fetched password from DB:", captain.password);

    isMatch = await captain.comparePassword(password);
    console.log(isMatch);

    if(!isMatch) {
        return res.status(401).json({ message: "invalid email or password" });
    }

    const token = captain.generateToken();
    console.log(token);

    res.cookie('token',  token);
    console.log("res.cookies=" , res.cookies);

    const captainData = captain.toObject();
    delete captainData.password;

    res.status(200).json({ message: "logged in succesfully..!",
        token,
        captain: captainData
    });

}

let captainProfile = async(req , res) => {
    console.log(req.captain);
    res.status(200).json({ captain: req.captain });
}

let logoutCaptain = async(req , res) => {
    try{
        const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);
     
        if(!token) {
         return res.status(400).json({ message: "token not found for blackList" });
        }
     
        const blackList = await blacklistTokenModel.create({token});
     
        res.clearCookie("token");
        return res.status(200).json({ message: "Logged out succesfully...1" })
    } catch(err) {
        return res.status(200).json({ message: "logged out Failed", error: err.message });
    }
}

module.exports = {
    registerCaptain,
    loginCaptain,
    captainProfile,
    logoutCaptain,
}