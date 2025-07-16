const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlenght: [3, "firstname must be atleast 3 characters or long"]
        },
        lastname: {
            type: String,
            minlenght: [3, "lastname must be atleast 3 characters or long"]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5 , "email must be atleast 3 characters or long"]
    },
    password: {
        type : String,
        required: true,
    },
    socketId: {
        type: String
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id , email: this.email} , process.env.JWT_SECRET , {expiresIn: '24h'});
    return token;
}

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password , this.password);
}

userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password , 10);
}

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;