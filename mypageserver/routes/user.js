const express = require("express");

const userController = require("../controller/user");

const router = express.Router();

// POST user/postUser
router.post("/postUser", userController.postUser);

// DELETE user/deleteUser
router.delete("/deleteUser", userController.deleteUser);

// PUT user/deleteUser
router.put("/updateUser", userController.updateUser);

// GET user/getUser/:id
router.get("/getUser/:id", userController.getUser);

// GET user/getUser/data/:id
router.get("/getUser/data/:userId", userController.getData);

module.exports = router;
