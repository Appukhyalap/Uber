const userModel = require("../models/user-model");
const { createUser } = require("../services/userService");
const { validationResult } = require("express-validator");

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

    const token = user.generateAuthToken();


    res.status(201).json({
      message: "User registered successfully",
      user,
      token
    });
  } catch (err) {
    next(err); // Or handle with res.status(500) if no error handler middleware
  }
};

module.exports = {
  registerUser,
};
