const express = require("express");
const { default: mongoose } = require("mongoose");
const users = require("../model/user");
const login_routes = express.Router();

const url = "mongodb://127.0.0.1:27017/opiniondb";

mongoose.connect(url).then(() => console.log("connected"));

//checking user authentication
login_routes.put("/", async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  try {
    const getUser = await users.findOne({
      email: email,
      password: password,
    });
    if (!getUser) {
      return res.status(400).send({ error: "user not found" });
    }
    
    return res.status(200).send(getUser);
  } catch (error) {
    res.status(500).send({ error: "error a gyaa" });
  }
});

module.exports = login_routes;
