const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname:{type:String },
    email:{type:String},
    password:{type:String }
});

const users = mongoose.model("users",userSchema);

module.exports = users;