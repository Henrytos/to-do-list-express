const mongoose = require("mongoose");

const userScheme = mongoose.Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model("User", userScheme);
