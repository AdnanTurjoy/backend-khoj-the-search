const mongoose = require("mongoose");
const Khoj = require("../model/khojModel");
const User = require("../model/UserModel");
const ObjectId = require("mongodb").ObjectId;
const addKhoj = async (req, res) => {
  try {
    const { input_values, user } = req.body;

    const values = input_values.split(/[ , ]/);

    const removeFalsyValue = values.filter(Boolean);

    const sortedNumbers = [...new Float64Array(removeFalsyValue).sort()];

    const arrToString = sortedNumbers.toString();

    const validInsertedFormet = arrToString.replaceAll(",", ", ");

    const newKhoj = new Khoj({
      input_values: validInsertedFormet,
      timestamp: new Date().toJSON(),
      user,
    });
    let tempUser;
    try {
      tempUser = await User.findById(user);
    } catch (error) {
      console.log(error);
    }
    // console.log(tempUser);
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newKhoj.save({ session: sess });
    tempUser.payload.push(newKhoj);
    await tempUser.save({ session: sess });
    await sess.commitTransaction();
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = addKhoj;
