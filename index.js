const express = require("express");
const app = express();
var cors = require("cors");
const connectDB = require("./database/connection");
const Khoj = require("./model/khojModel");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get("/Khoj_the_search_Page", (req, res) => {
  res.sendFile(__dirname + "/Khoj_the_search_Page.html");
});
app.get("/api_end_point", async (req, res) => {
  try {
    const khoj = await Khoj.find();
    res.status(200).send({ khoj });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});
app.post("/Khoj_the_search_Page", (req, res) => {
  try {
    const newKhoj = new Khoj();
    const { input_values, search_value } = req.body;
    //console.log(input_values);
    const search = Number(search_value);
    const values = input_values.split(/[ , ]/);
    //console.log(search, values);
    let arr = [];
    let found = "failed";
    for (let index = 0; index < values.length; index++) {
      const element = Number(values[index]);
      arr.push(element);
      // console.log(typeof element);
      if (element === search) {
        found = "success";
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
    if (found === "success") {
      newKhoj.status = "success";
    } else {
      newKhoj.status = "not found";
    }

    newKhoj.save();
  } catch (error) {
    res.status(500).send(error);
  }
});

const PORT = 8005;

app.listen(PORT, async () => {
  console.log(`Server is Running at http://localhost:${PORT}`);
  await connectDB();
});
