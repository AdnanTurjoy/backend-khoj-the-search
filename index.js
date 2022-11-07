const express = require("express");
const app = express();
var cors = require("cors");
const connectDB = require("./database/connection");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get("/Khoj_the_search_Page", (req, res) => {
  res.sendFile(__dirname + "/Khoj_the_search_Page.html");
});
app.get("/api_end_point", (req, res) => {
  //res.status(200).json({ users });
  res.send("api");
});
app.post("/Khoj_the_search_Page", (req, res) => {
  const input_values = req.body.input_values;
  const search_value = Number(req.body.search_value);
  const values = input_values.split(/[ , ]/);
  let found = false;
  for (let index = 0; index < values.length; index++) {
    const element = Number(values[index]);
    if (element === search_value) {
      found = true;
    }
  }

  //res.send(found);
  res.json({ found });
});

const PORT = 8005;

app.listen(PORT, async () => {
  console.log(`Server is Running at http://localhost:${PORT}`);
  await connectDB();
});
