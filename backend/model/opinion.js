const mongoose = require("mongoose");
const { Schema } = mongoose;

const opinionSchema = new mongoose.Schema({
  name: { type: String },
  email: {type: String},
  title: { type: String },
  opinion: { type: String },
  votes: { type: Number },
  category: {type: String },
  upvotes: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  downvotes: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
},{ timestamps: true });

const opinions = mongoose.model("opinions", opinionSchema);

module.exports = opinions;
