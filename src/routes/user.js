const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", async (req, res) => {
  try {
    let users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    let { name } = req.body;
    const user = await User.create({ name });
    res.status(200).json(user);
  } catch (error) {
    res.status(422).json(error);
  }
});

router.put("/:id", async (req, res) => {
  let { name } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let user = await User.findByIdAndRemove(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
