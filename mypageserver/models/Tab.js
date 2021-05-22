const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TabSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tabs: [],
  links: [
    {
      title: String,
      imgUrl: String,
      imgPath: String,
      url: String,
      tags: [],
    },
  ],
});

module.exports = mongoose.model("Tabs", TabSchema);
