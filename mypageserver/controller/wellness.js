const Wellness = require("../models/Wellness");

// {userId:"",wellnessData:{moodScore:3,exercise:{hours:2,minutes:32}}}
exports.postData = (req, res, next) => {
  const { userId, wellnessData } = req.body;
  Wellness.findOne({ userId: userId })
    .then((response) => {
      const data = {
        moodScore: wellnessData.moodScore,
        exercise: convertToMinutes(
          wellnessData.exercise.hours,
          wellnessData.exercise.minutes
        ),
        date: date(),
      };
      if (isSameDay(response)) {
        response.wellnessData.pop();
      }
      response.wellnessData = [...response.wellnessData, data];
      return response.save();
    })
    .then((confirmation) => {
      res.status(200).json({ status: 200, response: confirmation });
    })
    .catch((err) => {
      next(err);
    });
};

//
exports.getData = (req, res, next) => {
  const { userId } = req.params;
  Wellness.findOne({ userId: userId })
    .then((result) => {
      res.status(200).json({ status: 200, response: result.wellnessData });
    })
    .catch((err) => {
      next(err);
    });
};

const convertToMinutes = (hours, minutes) => {
  let totalTime = 0;
  if (hours) {
    totalTime += parseInt(hours) * 60;
  }
  if (minutes) {
    totalTime += parseInt(minutes);
  }
  return totalTime;
};

const date = () => {
  let date = Date(Date.now());
  return date.split(" ").splice(0, 4).join("-");
};

const isSameDay = (response) => {
  const data = response.wellnessData;
  if (data.length > 0 && data[data.length - 1].date === date()) {
    return true;
  }
  return false;
};
