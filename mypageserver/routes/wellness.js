const express = require("express");
const router = express.Router();

const wellnessController = require("../controller/wellness");

// POST wellness/postData
router.post("/postData", wellnessController.postData);

// GET wellness/postData
router.get("/getData/:userId", wellnessController.getData);

module.exports = router;
