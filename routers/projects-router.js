const express = require("express");

const projectsDb = require("../data/helpers/projectModel.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const projects = await projectsDb.get();

    res.status(200).json(projects);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the projects."
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const project = await projectsDb.get(req.params.id);

    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: "Project not found!" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving the project!"
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const project = await projectsDb.insert(req.body);
    if (project) {
      res.status(201).json(project);
    } else {
      res.status(404).json({ message: "Project cannot be added!" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error adding the project!"
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedProject = await projectsDb.update(req.params.id, req.body);
    if (updatedProject) {
      res.status(200).json(updatedProject);
    } else {
      res.status(404).json({ message: "Cannot update the project." });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error updating the project!"
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const count = await projectsDb.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "The project has been removed." });
    } else {
      res.status(404).json({ message: "Project cannot be found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error removing the project!"
    });
  }
});

module.exports = router;
