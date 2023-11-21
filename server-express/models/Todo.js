const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true, default: "admin" },
  complete: { type: Boolean, required: false, default: false },
  completedOn: { type: Date, required: false, default: "" },
  createdOn: { type: Date, required: false, default: "" },
});

//Export model
module.exports = mongoose.model("Todo", PostSchema);
