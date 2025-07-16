const userModel = require("../models/user-model");
const { createUser } = require("../services/userService");
const { validationResult } = require("express-validator");
const {blacklistTokenModel} = require("../models/blacklistToken-model");

let registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;

  try {
    // Await the password hash

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" }); // 409 = Conflict
    }

    const hashedPassword = await userModel.hashPassword(password);

    // Await user creation
    const user = await createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
    });

    // const token = user.generateAuthToken();


    res.status(201).json({
      message: "User registered successfully",
      user,
      token
    });
  } catch (err) {
    next(err); // Or handle with res.status(500) if no error handler middleware
  }
};

let loginUser = async (req, res) => {

  let { email, password } = req.body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = await userModel.findOne({ email }).select('+password');
  if (!user) {
    return res.status(401).json({ message: "invalid email or password" });
  }

  const isMatch = await user.comparePassword(password);
  console.log(isMatch);

  if (!isMatch) {
    return res.status(401).json({ message: "invalid email or password" });
  }

  const token = user.generateAuthToken();
  console.log("token=", token);
  res.cookie("token", token);
  console.log("req.cookie=", req.cookies);
  res.status(200).json({ token, user });
}

let userProfile = async (req, res) => {
  console.log(req.user);
}

let userLogout = async (req, res) => {
  try {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
      return res.status(400).json({ message: "No token found to blacklist" });
    }

    await blacklistTokenModel.create({ token });

    // ✅ Clear cookie with matching options (if set on login)
    res.clearCookie("token");

    console.log("Logged out successfully...");
    return res.status(200).json({ message: "Logged out successfully" }); // ✅ Response ends request
  } catch (err) {
    return res.status(500).json({ message: "Logout failed", error: err.message });
  }
};


module.exports = {
  registerUser,
  loginUser,
  userProfile,
  userLogout,
};
