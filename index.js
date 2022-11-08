const express = require("express");
const app = express();
var cors = require("cors");
const connectDB = require("./database/connection");
const Khoj = require("./model/khojModel");
const {
  registerUser,
  loginUser,
  getAllKhoj,
  allUser,
  getFind,
} = require("./controller/userController");
const addKhoj = require("./controller/khojController");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/payload", async (req, res) => {
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

app.get("/api_end_point", allUser);
app.get("/users/:email", getFind);
app.get("/users/:email/khoj", getAllKhoj);

app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.error(error);
  }
  next(error);
});
app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  } else {
    res.status(500).json({
      message: error.message,
    });
  }
});
app.listen(process.env.PORT || 8005, async () => {
  console.log("Server is Running");
  await connectDB();
});
