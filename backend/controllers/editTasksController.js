const taskModal = require("../models/taskModel");

async function editTasksController(req, res) {
  // get id from params
  const { taskid: id } = req.params;

  // get values from req.body
  const inputEditTaskData = req.body;

  if (!inputEditTaskData) {
    res.status(400).json({ message: "can't find task now" });
  }

  const { title: editedTaskTitle, description: editedTaskDescription } =
    inputEditTaskData;

  // validate
  if (!editedTaskTitle || !editedTaskDescription) {
    res.status(400).json({ message: "try again later" });
  }

  try {
    const returnedDataFromDb = await taskModal.findByIdAndUpdate(
      id,
      {
        title: editedTaskTitle,
        description: editedTaskDescription,
      },
      { new: true }
    );
    res.status(200).json({
      message: "task edited to the task list",
      taskInfo: returnedDataFromDb.title,
    });
  } catch (error) {
    res.status(400).json({ message: "task can't be accessed right now" });
  }
}

module.exports = editTasksController;
