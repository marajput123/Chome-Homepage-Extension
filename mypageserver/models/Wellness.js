const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WellnessSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  wellnessData: [
    {
      moodScore: {
        type: Number,
        default: 0,
      },
      exercise: {
        type: Number,
        default: 0,
      },
      date: {
        type: String,
        default: Date(Date.now()).split(" ").splice(0, 4).join("-"),
      },
    },
  ],
});

module.exports = mongoose.model("wellness", WellnessSchema);
