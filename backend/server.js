const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');

const opinion_routes = require("./routes/route.js");
const signup_routes = require("./routes/signup_routes.js");
const login_routes = require("./routes/login_routes.js");

const app = express();
const PORT = 8080;
const url = "mongodb://127.0.0.1:27017/opiniondb";

/*app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});*/

// Enable CORS for your frontend origin
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // if you're using cookies or auth headers
}));

app.use(express.json());

app.use("/opinion", opinion_routes );
app.use("/signup",signup_routes);
app.use("/login",login_routes);

app.use("/",(req,res) => {
    try{
        return res.status(200).send("REQUEST SEND SUCCESSFULLY.");
    }catch(error){
        return res.status(500).send("SERVER NOT CONNECTED.");
    }
})

app.listen(PORT, async() => {
    await mongoose.connect(url).then(() => console.log("mongodb connected")).catch(err => console.log("error: ", err));
    console.log("server is running at http://localhost:8080");
})




