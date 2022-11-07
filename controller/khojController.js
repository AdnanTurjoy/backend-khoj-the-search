const Khoj = require("../model/khojModel");

const addKhoj = (req, res) => {
  try {
    const newKhoj = new Khoj();
    const { input_values, search_value } = req.body;
    //console.log(input_values);
    const search = Number(search_value);
    const values = input_values.split(/[ , ]/);
    //console.log(search, values);
    let arr = [];
    let found = false;
    for (let index = 0; index < values.length; index++) {
      const element = Number(values[index]);
      arr.push(element);
      // console.log(typeof element);
      if (element === search) {
        found = true;
      }
    }

    res.json({ found });
    const removeFalsy = arr.filter(Boolean);
    console.log(removeFalsy.sort());

    // console.log(myArr);
    const removeFalsyValue = values.filter(Boolean);
    //console.log(removeFalsyValue);
    const sortedNumbers = [...new Float64Array(removeFalsyValue).sort()];

    const arrToString = sortedNumbers.toString();

    const validInsertedFormet = arrToString.replaceAll(",", ", ");
    //console.log(validInsertedFormet);
    const newObj = {
      input_values: validInsertedFormet,
      timestamp: new Date().toJSON(),
    };

    newKhoj.payload = newObj;

    newKhoj.status = "success";

    newKhoj.save();
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = addKhoj;
