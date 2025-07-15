const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const {registerUser} = require("../controllers/userController");

router.post("/register"  , [
    body("email").isEmail().withMessage("Invalid email.."),
    body("fullname.firstname").isLength({min:3}).withMessage("first name must be atleast 3 characters..long"),
    body("password").isLength({min : 6}).withMessage("password must be atleast 3 characters..long")
] , registerUser);


module.exports = router;