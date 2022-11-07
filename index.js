const express = require("express");
const app = express();
var cors = require("cors");
const connectDB = require("./database/connection");
const Khoj = require("./model/khojModel");
const { registerUser, loginUser } = require("./controller/userController");
const addKhoj = require("./controller/khojController");
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
app.post("/Khoj_the_search_Page", addKhoj);

app.post("/register", registerUser);
app.post("/login", loginUser);

const PORT = 8005;

app.listen(PORT, async () => {
  console.log(`Server is Running at http://localhost:${PORT}`);
  await connectDB();
});
