const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const { registerCaptain } = require("../controllers/captainController");


router.post("/register"  , [
    body("email").isEmail().withMessage("Invalid email.."),
    body("fullname.firstname").isLength({min:3}).withMessage("first name must be atleast 3 characters..long"),
    body("password").isLength({min : 6}).withMessage("password must be atleast 3 characters..long"),
    body("vehicle.color").isLength({min: 3}).withMessage("color must be atleast 3 characters..long"),
    body("vehicle.plate").isLength({min: 3}).withMessage("plate must be atleast 3 characters..long"),
    body("vehicle.capacity").isLength({min: 1}).withMessage("capacity must be atleast 3 characters..long"),
    body("vehicle.vehicleType").isLength({min: 2}).withMessage("type must be atleast 2 characters..long")
], registerCaptain);

module.exports = router;