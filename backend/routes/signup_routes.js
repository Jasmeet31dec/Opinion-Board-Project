const express  = require("express");
const { default: mongoose } = require("mongoose");
const user = require("../model/user");
const signup_routes = express.Router();

const url = "mongodb://127.0.0.1:27017/opiniondb";

mongoose.connect(url).then(() => console.log("connected"));

//adding new user
signup_routes.post("/",async (req,res) => {
    const {fullname,email,password} = req.body;
    try {
        const response = await user.create({
            fullname,
            email,
            password
        });
        res.status(200).send(response);
    } catch (error) {
        res.status(500).json({"error" :  error});
    }
});

module.exports = signup_routes;