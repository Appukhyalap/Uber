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

        res.status(201).json({ token, captain });
    }
    catch (err) {
        console.log("Error message", err.message);
        return res.status(500).json({ message: "Server error", error: err.message });
    }

}

module.exports = {
    registerCaptain,
}