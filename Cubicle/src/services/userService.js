const bcrypt = require("bcrypt");
const User = require("../models/User");
const { MongooseError } = require("mongoose");
const jwt = require("../lib/jwt");
const { SECRET } = require("../constants");

exports.register = async (username, password) => {
  const salt = await bcrypt.genSalt(10);
  const passwordHesh = await bcrypt.hash(password, salt);

  const result = await User.create({ username, password: passwordHesh });
  return result;
};

exports.login = async (username, password) => {
  const user = await User.findOne({ username });

  if (!user) {
    throw new MongooseError("Invalid username or password");
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new MongooseError("Invalid username or password");
  }

  const payload = {
    _id: user._id,
    username: user.username,
  };

  const token = await jwt.sign(payload, SECRET, { expiresIn: "2d" });
  return token;
};
