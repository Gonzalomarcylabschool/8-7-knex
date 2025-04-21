const Fellow = require('../model/Fellow');

/* 
These controllers take incoming requests and utilize the
methods provided by the Fellow "model" before sending a
response back to the client (or an error message).
*/

// Get All (Read)
const serveFellows = async (req, res) => {
  const fellowsList = await Fellow.list();
  res.send(fellowsList);
}

// Get One (Read)
const serveFellow = async (req, res) => {
  const { id } = req.params;
  const fellow = await Fellow.find(Number(id));

  if (!fellow) {
    return res.status(404).send({
      message: `No fellow with the id ${id}`
    });
  }
  res.send(fellow);
};

// Create
const createFellow = async (req, res) => {
  const { fellowName } = req.body;
  if (!fellowName) {
    return res.status(400).send({ message: "Invalid Name" });
  }

  const newFellow = await Fellow.create(fellowName);
  res.send(newFellow);
};

// Update
const updateFellow = async (req, res) => {
  const { fellowName } = req.body;

  if (!fellowName) {
    return res.status(400).send({ message: "Invalid Name" });
  }

  const { id } = req.params;
  const updatedFellow = await Fellow.editName(Number(id), fellowName);

  if (!updatedFellow) {
    return res.status(404).send({
      message: `No fellow with the id ${id}`
    });
  }

  res.send(updatedFellow);
}

// Delete
const deleteFellow = async (req, res) => {
  const { id } = req.params;
  const didDelete = await Fellow.delete(Number(id));

  if (!didDelete) {
    return res.status(404).send({
      message: `No fellow with the id ${id}`
    });
  }

  res.sendStatus(204);
}

module.exports = {
  serveFellows,
  serveFellow,
  createFellow,
  updateFellow,
  deleteFellow
};