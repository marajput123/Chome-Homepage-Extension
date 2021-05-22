const Tab = require("../models/Tab");
const mongoose = require("mongoose");
const { response } = require("express");
// { userId:"" {title:"",imgUrl:"",imgPath:"",url,tags:[]}}
exports.createLink = (req, res, next) => {
  const { title, imgUrl, imgPath, url, tags, userId } = req.body;
  Tab.findOne({ userId: mongoose.Types.ObjectId(userId) })
    .then((result) => {
      result.links.push({
        title: title,
        imgUrl: imgUrl,
        imgPath: imgPath,
        url: url,
        tags: [...tags],
      });
      result
        .save()
        .then((response) => {
          res.status(201).json({
            status: 201,
            response: { _id: result.links.pop()._id },
          });
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
};

// {linkId:"",userId:"",link:{title:"",imgUrl:"",imgPath:"",url,tags:[]}}
exports.updateLink = (req, res, next) => {
  const { linkId, newLink, userId } = req.body;
  Tab.findOne({ userId: userId })
    .then((result) => {
      const index = result.links.findIndex(
        (link) => link._id.toString() === linkId
      );
      result.links[index] = {
        title: newLink.title,
        _id: mongoose.Types.ObjectId(linkId),
        imgUrl: newLink.imageUrl,
        url: newLink.url,
        tags: newLink.tags,
      };
      // console.log(result);
      result
        .save()
        .then((response) => {
          res.status(200).json({ status: 200, response: response });
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
};

// {linkId:"", userId:""}
exports.deleteLink = (req, res, next) => {
  const { linkId, userId } = req.body;
  Tab.findOne({ userId: mongoose.Types.ObjectId(userId) })
    .then((result) => {
      const updatedLinks = result.links.filter(
        (link) => link._id.toString() !== linkId.toString()
      );
      result.links = updatedLinks;
      return result.save();
    })
    .then((response) => {
      console.log(response);
      res.status(200).json({ status: 200, response: response });
    })
    .catch((err) => {
      next(err);
    });
};

// {userId:"", tab:""}
exports.createTab = (req, res, next) => {
  const { newTab, userId } = req.body;
  Tab.findOne({ userId: userId })
    .then((result) => {
      result.tabs.push(newTab);
      return result.save();
    })
    .then((response) => {
      res.status(201).json({ status: 201, response: response });
      console.log(response);
    })
    .catch((err) => {
      next(err);
    });
};

// {usrId:"" tab:""}
exports.deleteTab = (req, res, next) => {
  const { deleteTab, userId } = req.body;
  Tab.findOne({ userId: userId })
    .then((result) => {
      const updatedTabs = result.tabs.filter((tab) => tab !== deleteTab);
      result.tabs = updatedTabs;
      return result.save();
    })
    .then((response) => {
      res.status(200).json({ status: 200, response: response });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getLinks = (req, res, next) => {
  const { userId } = req.params;
  let tab = req.query.tab.split("+").join(" ");
  Tab.findOne({ userId: userId })
    .then((result) => {
      let links;
      if (tab === "Home" || tab === "") {
        links = result.links;
      } else {
        links = result.links.filter((link) => {
          if (link.tags.includes(tab)) {
            return link;
          }
        });
      }
      res.json({ status: "getLinks-Success", response: links });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getTabs = (req, res, next) => {
  const { userId } = req.params;
  Tab.findOne({ userId: userId })
    .then((result) => {
      res.json({ status: "getTabs-Success", response: result.tabs });
    })
    .catch((err) => {
      console.log(err);
    });
};
