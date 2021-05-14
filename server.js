const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");

require("dotenv").config();

app.use(cors());
app.use(express.json());

app.get("/hi", (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(" ");

  try {
    const isValid = jwt.verify(token, process.env.JWT_KEY);
    if (isValid) {
      res.json({
        message: "Hi",
      });
    } else {
      res.status(401).json({
        message: "invalid token",
      });
    }
  } catch (error) {
    res.status(401).json({
      message: error,
    });
  }
});

app.post("/login", (req, res) => {
  const USERNAME = "admin";
  const PASSWORD = "admin";

  const { username, password } = req.body;

  if (username === USERNAME && password === PASSWORD) {
    const user = {
      id: 1,
      username: username,
    };
    const token = jwt.sign(
      {
        user,
      },
      process.env.JWT_KEY
    );
    res.json({
      user,
      token,
    });
  } else {
    res.status(403).json({
      message: "invalid credentials",
    });
  }
});

const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
