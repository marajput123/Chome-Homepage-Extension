const express = require("express");
const tabController = require("../controller/tab");

const router = express.Router();

// POST tab/createLink
router.post("/createLink", tabController.createLink);

// UPDATE tab/updateLink
router.put("/updateLink", tabController.updateLink);

// DELETE tab/deleteLink
router.delete("/deleteLink", tabController.deleteLink);

// POST tab/createTab
router.post("/createTab", tabController.createTab);

// DELETE tab/deleteTab
router.delete("/deleteTab", tabController.deleteTab);

// GET tab/getLinks
router.get("/getLinks/:userId", tabController.getLinks);

// GET tab/getTabs
router.get("/getTabs/:userId", tabController.getTabs);

module.exports = router;
