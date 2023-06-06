const { Tutorial, Tutoriales } = require("../models/tutorial.model.js");

// Create and Save a new Tutorial
const create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const { title, description, published } = req.body;

  //console.log(title, description, published, "title,description ,publication");

  // Create a Tutorial
  const tutorial = new Tutorial({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false,
  });

  //console.log(tutorial, "tutorial-----");

  // Save Tutorial in the database
  Tutoriales.create(tutorial, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    else res.send(data);
  });
};

// Retrieve all Tutorials from the database (with condition).
const findAll = (req, res) => {
  const title = req.query.title;
  Tutoriales.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    else res.send(data);
  });
};

// Find a single Tutorial by Id
const findOne = (req, res) => {
  Tutoriales.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Tutorial with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// find all published Tutorials
const findAllPublished = (req, res) => {
  Tutoriales.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    else res.send(data);
  });
};

// Update a Tutorial identified by the id in the request
const update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  Tutoriales.updateById(req.params.id, new Tutorial(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Tutorial with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete a Tutorial with the specified id in the request
const deleted = (req, res) => {
  Tutoriales.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Tutorial with id " + req.params.id,
        });
      }
    } else res.send({ message: `Tutorial was deleted successfully!` });
  });
};

// Delete all Tutorials from the database.
const deleteAll = (req, res) => {
  Tutoriales.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials.",
      });
    else res.send({ message: `All Tutorials were deleted successfully!` });
  });
};

const tutorials = {
  create,
  findAll,
  findOne,
  findAllPublished,
  update,
  deleted,
  deleteAll,
};

module.exports = { tutorials };
