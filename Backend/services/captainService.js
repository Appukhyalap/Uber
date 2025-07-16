const captainModel = require("../models/captain-model");

let createCaptain = async({
    firstname, lastname, email, password,
    color, plate, vehicleType, capacity
}) => {
    if(!firstname || !email || !password || !color || !plate || !vehicleType || !capacity) {
        throw new Error("all fields are required...!");
    }

    const Captain = await captainModel.create({
        fullname: {
            firstname,
            lastname,
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType,
        }
    });

    return Captain;
}

module.exports = {
    createCaptain,
}