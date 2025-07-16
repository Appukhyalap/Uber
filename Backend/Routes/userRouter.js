const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const {registerUser , loginUser, userProfile, userLogout} = require("../controllers/userController");
const { isLoggedin } = require("../middlewares/isloggedIn");

router.post("/register"  , [
    body("email").isEmail().withMessage("Invalid email.."),
    body("fullname.firstname").isLength({min:3}).withMessage("first name must be atleast 3 characters..long"),
    body("password").isLength({min : 6}).withMessage("password must be atleast 3 characters..long")
] , registerUser);

router.post("/login"  , [
    body("email").isEmail().withMessage("Invalid email.."),
    body("password").isLength({min : 6}).withMessage("password must be atleast 3 characters..long")
] , loginUser);

router.get("/profile" , isLoggedin , userProfile)


router.get("/logout" , isLoggedin , userLogout)


module.exports = router;