const mongoose = require("mongoose");
const Khoj = require("../model/khojModel");
const User = require("../model/UserModel");
const ObjectId = require("mongodb").ObjectId;
const addKhoj = async (req, res) => {
  try {
    const { input_values, search_value, user } = req.body;
    const search = Number(search_value);
    const values = input_values.split(/[ , ]/);
    let arr = [];
    let found = false;
    for (let index = 0; index < values.length; index++) {
      const element = Number(values[index]);
      arr.push(element);

      if (element === search) {
        found = true;
      }
    }

    //res.json({ found });
    const removeFalsy = arr.filter(Boolean);
    //console.log(removeFalsy.sort());

    const removeFalsyValue = values.filter(Boolean);

    const sortedNumbers = [...new Float64Array(removeFalsyValue).sort()];

    const arrToString = sortedNumbers.toString();

    const validInsertedFormet = arrToString.replaceAll(",", ", ");

    const newKhoj = new Khoj({
      input_values: validInsertedFormet,
      timestamp: new Date().toJSON(),
      status: "success",
      user,
    });
    let tempUser;
    try {
      tempUser = await User.findById(user);
    } catch (error) {
      console.log(error);
    }
    console.log(tempUser);
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newKhoj.save({ session: sess });
    tempUser.payload.push(newKhoj);
    await tempUser.save({ session: sess });
    await sess.commitTransaction();
    // newKhoj.input_values = validInsertedFormet;
    // newKhoj.timestamp = new Date().toJSON();
    // newKhoj.status = "success";
    // newKhoj.save();
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = addKhoj;
