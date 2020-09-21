const User = require("../models/user");
const { errorHandler } = require("../helpers/dbErrorHandler");
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const user = require("../models/user");

dotenv.config();

exports.signUp = (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err),
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user,
    });
  });
};

exports.signIn = (req, res) => {
  // find a user base on email
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      res
        .status(400)
        .json({ err: "User with that email is not exist, please sign up." });
    }
    // if user is found, make sure email and password match
    //create authenticate method in user model

    if (!user.authenticate(password)) {
      res.status(400).json({ error: "email or password don't match" });
    }
    // gennerate a signed token with user Id and secret
    const token = jwt.sign({ _id: user.id }, process.env.JWT);

    //persist the token as 'token'in cookie with expiry date
    res.cookie("token", token, { expire: new Date() + 9999 });

    //return response with user and token on frontend client
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signOut = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "signout is successfully" });
};

("use strict");

// Get unique error field name

const uniqueMessage = (error) => {
  let output;
  try {
    let fieldName = error.message.substring(
      error.message.lastIndexOf(".$") + 2,
      error.message.lastIndexOf("_1")
    );
    output =
      fieldName.charAt(0).toUpperCase() +
      fieldName.slice(1) +
      " already exists";
  } catch (ex) {
    output = "Unique field already exists";
  }

  return output;
};

// Get the erroror message from error object

exports.errorHandler = (error) => {
  let message = "";

  if (error.code) {
    switch (error.code) {
      case 11000:
      case 11001:
        message = uniqueMessage(error);
        break;
      default:
        message = "Something went wrong";
    }
  } else {
    for (let errorName in error.errorors) {
      if (error.errorors[errorName].message)
        message = error.errorors[errorName].message;
    }
  }

  return message;
};

//resolved Algorithms should be set

exports.requireSignin = expressJwt({
  secret: process.env.JWT,
  algorithms: ["HS256"], // added later
  userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.auth._id == req.profile._id;
  if (!user) {
    return res.status(403).json({
      error: "Access denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role == 0) {
    return res.status(403).json({
      error: "Admin sourced. Acces denied",
    });
  }
  next();
};
