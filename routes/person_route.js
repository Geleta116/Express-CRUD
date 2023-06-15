const express = require('express');
const validatePersonSchema = require('../middleware/person_schema_validator');
const { validate } = require('../schema/person_schema');
const router = express.Router();
const { v4: uuidv4 } = require("uuid");



// This will get all the persons
router.get("", (req, res) => {
  const database = req.app.get('db');
  res.status(200).json(database);
});




//This will get the person with the id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const database = req.app.get('db');
  const found = database.find(person => person.id === id);
  if (found) {
    res.status(200).json(found);
  } else {
    res.status(404).send("Person not found");
  }
});




//This will create a new person
router.post("/", validatePersonSchema, (req, res) => {
  const { name, age, hobbies } = req.body;
  const newPerson = {
    id: uuidv4(),
    name: name || "",
    age: age || "",
    hobbies: hobbies || [],
  };

  const database = req.app.get('db');
  database.push(newPerson);
  res.status(200).json(newPerson);
});



//This will update the person with the id
router.put("/:id", validatePersonSchema, (req, res) => {
  const { id } = req.params;
  const { name, age, hobbies } = req.body;
  const database = req.app.get('db');
  const personIndex = database.findIndex(person => person.id === id);
  if (personIndex !== -1) {
    const updatedPerson = {
      id: id,
      name: name || "",
      age: age || "",
      hobbies: hobbies || [],
    };
    database[personIndex] = updatedPerson;
    res.status(200).json(updatedPerson);
  } else {
    res.status(404).send("Person not found");
  }
});


//This will delete the person with the id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const database = req.app.get('db');
  const personIndex = database.findIndex(person => person.id === id);
  if (personIndex !== -1) {
    database.splice(personIndex, 1);
    res.json(database);
  } else {
    res.status(404).send("Person not found");
  }
});

module.exports = (app) => {
  app.use("/person", router);
};
