const User = require("../models/User");
const Tab = require("../models/Tab");
const Wellness = require("../models/Wellness.js");

exports.getUser = (req, res, next) => {
  const { id } = req.params;
  User.findOne({ secretId: id })
    .then((result) => {
      if (!result) {
        const err = new Error();
        err.message = "User does not exist";
        err.status = 401;
        throw err;
      }
      res.status(200).json({ status: 200, response: result });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postUser = (req, res, next) => {
  const { name, date, favoriteFood } = req.body;

  const secretId = (
    name[0].toUpperCase() +
    name.slice(1) +
    "-" +
    date +
    "-" +
    favoriteFood
  ).replace(/\s+/g, "");

  const user = new User({
    name: name,
    secretId: secretId,
  });

  user
    .save()
    .then((result) => {
      const tab = new Tab({
        userId: result._id,
        tabs: [],
        links: [],
      });
      tab
        .save()
        .then((tabData) => {
          const wellness = new Wellness({
            userId: tabData.userId,
            wellnessData: [],
          });
          return wellness.save();
        })
        .then((wellnessData) => {
          res.status(201).json({ status: 201, _id: result._id });
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteUser = (req, res, next) => {
  const { userId } = req.body;
  User.findOne({ _id: userId })
    .then((result) => {
      return result.remove();
    })
    .then((removed) => {
      res.status(200).json({ status: 200, response: removed });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getData = (req, res, next) => {
  const { userId } = req.params;
  Tab.findOne({ userId: userId })
    .populate("userId")
    .then((tab) => {
      Wellness.findOne({ userId: userId })
        .then((wellness) => {
          const message = {
            tabs: tab.tabs,
            wellness: wellness.wellnessData,
          };
          res.status(200).json({ status: 200, response: message });
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateUser = (req, res, next) => {
  const { userId, newSecretKey } = req.body;
  User.findOne({ _id: userId })
    .then((user) => {
      user.secretId = newSecretKey;
      return user.save();
    })
    .then((response) => {
      res.status(200).json({ status: 200, rseponse: response });
    })
    .catch((err) => {
      next(err);
    });
};
