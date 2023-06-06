const { tutorials } = require("../controllers/tutorial.controller.js");

const TutorialRoutes = require("express").Router();

// Create a new Tutorial
TutorialRoutes.post("/", tutorials.create);

// Retrieve all Tutorials
TutorialRoutes.get("/", tutorials.findAll);

// Retrieve all published Tutorials
TutorialRoutes.get("/published", tutorials.findAllPublished);

// Retrieve a single Tutorial with id
TutorialRoutes.get("/:id", tutorials.findOne);

// Update a Tutorial with id
TutorialRoutes.put("/:id", tutorials.update);

// Delete a Tutorial with id
TutorialRoutes.delete("/:id", tutorials.deleted);

// Delete all Tutorials
TutorialRoutes.delete("/", tutorials.deleteAll);

module.exports = { TutorialRoutes };
