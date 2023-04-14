const taskModal = require("../models/taskModel");

// fields -> title, description
async function addTasksController(req, res) {
  // get values from req.body
  const inputTaskData = req.body;

  if (!inputTaskData) {
    res.status(400).json({ message: "Invalid request" });
  }

  const { title: taskTitle, description: taskDescription } = inputTaskData;

  // validata
  if (!taskTitle || !taskDescription) {
    res.status(400).json({ message: "Every field is mandatory" });
  }

  try {
    const returnedTaskDataFromDb = await taskModal.create({
      title: taskTitle,
      description: taskDescription,
    });

    res.status(200).json({
      message: "task added to the task list",
      taskInfo: returnedTaskDataFromDb,
    });
  } catch (error) {
    res.status(400).json({ message: "something went wrong" });
  }
}

module.exports = addTasksController;
