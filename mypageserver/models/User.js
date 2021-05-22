const Tab = require("./Tab");
const Wellness = require("./Wellness");

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  secretId: {
    type: String,
    required: true,
  },
});

UserSchema.pre("remove", function (next) {
  // 'this' is the client being removed. Provide callbacks here if you want
  // to be notified of the calls' result.
  console.log("test");
  Tab.deleteOne({ userId: this._id }).exec();
  Wellness.deleteOne({ userId: this._id }).exec();
  next();
});

module.exports = mongoose.model("User", UserSchema);
