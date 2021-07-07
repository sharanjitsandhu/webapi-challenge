const express = require("express");

const actionsDb = require("../data/helpers/actionModel.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const actions = await actionsDb.get();

    res.status(200).json(actions);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the actions."
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const actions = await actionsDb.get(req.params.id);

    if (actions) {
      res.status(200).json(actions);
    } else {
      res.status(404).json({ message: "Action not found!" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving the action!"
    });
  }
});

router.post("/", async (req, res) => {
  try {
    await actionsDb.insert(req.body);
    res.status(201).json({
      message: "You have created a new action."
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error adding the action!"
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedAction = await actionsDb.update(req.params.id, req.body);
    if (updatedAction) {
      res.status(200).json(updatedAction);
    } else {
      res.status(404).json({ message: "Cannot update the action." });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error updating the action!"
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const count = await actionsDb.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "The action has been removed." });
    } else {
      res.status(404).json({ message: "Action cannot be found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error removing the action!"
    });
  }
});

module.exports = router;
