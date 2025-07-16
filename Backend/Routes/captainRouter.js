const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const { registerCaptain, loginCaptain, captainProfile, logoutCaptain } = require("../controllers/captainController");
const { isCaptain } = require("../middlewares/isCaptain");


router.post("/register"  , [
    body("email").isEmail().withMessage("Invalid email.."),
    body("fullname.firstname").isLength({min:3}).withMessage("first name must be atleast 3 characters..long"),
    body("password").isLength({min : 6}).withMessage("password must be atleast 3 characters..long"),
    body("vehicle.color").isLength({min: 3}).withMessage("color must be atleast 3 characters..long"),
    body("vehicle.plate").isLength({min: 3}).withMessage("plate must be atleast 3 characters..long"),
    body("vehicle.capacity").isLength({min: 1}).withMessage("capacity must be atleast 3 characters..long"),
    body("vehicle.vehicleType").isLength({min: 2}).withMessage("type must be atleast 2 characters..long")
], registerCaptain);


router.post("/login"  , [
    body("email").isEmail().withMessage("Invalid email.."),
    body("password").isLength({min : 6}).withMessage("password must be atleast 3 characters..long")
] , loginCaptain);

router.get("/profile" , isCaptain , captainProfile);

router.get("/logout" , isCaptain , logoutCaptain);

module.exports = router;