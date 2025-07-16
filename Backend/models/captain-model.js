const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "Firstname must be at least 3 characters long."]
        },
        lastname: {
            type: String,
            minlength: [3, "Lastname must be at least 3 characters long."]
        }
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },

    socketId: {
        type: String
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, "Color must be at least 3 characters long"]
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, "Plate must be at least 3 characters."]
        },
        capacity: {
            type: Number,
            required: true,
            minlength: [1, "Capacity must be at least 1 characters long."]
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ["car", "motorcycle", "auto"],
            minlength: [2, "vehicleType must be at least 2 characters long."]
        },
    },
    location: {
        lat: {
            type: Number
        },
        lng: {
            type: Number
        }
    }
});


captainSchema.methods.generateToken = function () {
    const token = jwt.sign({ _id: this._id, email: this.email }, process.env.JWT_SECRET, {expiresIn: '24h'});
    return token;
}

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const CaptainModel = mongoose.model("Captain", captainSchema);
module.exports = CaptainModel;
