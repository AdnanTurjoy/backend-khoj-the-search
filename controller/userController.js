const User = require("../model/UserModel");
const { hashPassword, comparePasswords } = require("../utils/hashPassword");
const generateAuthToken = require("../utils/generateAuthToken");
const registerUser = async (req, res) => {
  try {
    const { name, lastName, email, password } = req.body;
    if (!(name && lastName && email && password)) {
      return res.status(400).send("All inputs are required");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send("user exists");
    } else {
      const hashedPassword = hashPassword(password);
      const user = await User.create({
        name,
        lastName,
        email: email.toLowerCase(),
        password: hashedPassword,
        payload: [],
      });
      res
        .cookie(
          "access_token",
          generateAuthToken(
            //JWT
            user._id,
            user.name,
            user.lastName,
            user.email
          ),
          {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
          }
        )
        .status(201)
        .json({
          success: "User created",
          userCreated: {
            _id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
          },
        });
    }
  } catch (err) {
    res.send(err); // need tp implement for error show
  }
};

// login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).send("All inputs are required");
    }

    const user = await User.findOne({ email });
    if (user && comparePasswords(password, user.password)) {
      let cookieParams = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      };

      return res
        .cookie(
          "access_token",
          generateAuthToken(user._id, user.name, user.lastName, user.email),
          cookieParams
        )
        .json({
          success: "user logged in",
          userLoggedIn: {
            _id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
          },
        });
    } else {
      return res.status(401).send("wrong credentials");
    }
  } catch (err) {
    res.send(err); // need tp implement for error show
  }
};

const allUser = async (req, res) => {
  let allUsers = await User.find();
  res.json(allUsers);
};

const getFind = async (req, res) => {
  let found = await User.find({
    email: req.params.email,
  });
  res.json(found);
};
const getAllKhoj = async (req, res) => {
  let foundKhoj = await User.find({
    email: req.params.email,
  }).populate("payload");
  res.json(foundKhoj);
};

module.exports = { registerUser, loginUser, getAllKhoj, allUser, getFind };
