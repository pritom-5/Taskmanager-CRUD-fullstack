const taskModal = require("../models/taskModel");

async function getTasksController(req, res) {
  try {
    const returnedDataFromDb = await taskModal.find();
    res
      .status(200)
      .json({ message: "list of all the tasks", tasks: returnedDataFromDb });
  } catch (error) {
    res.status(400).json({ message: "Can't access data" });
  }
}

module.exports = getTasksController;
