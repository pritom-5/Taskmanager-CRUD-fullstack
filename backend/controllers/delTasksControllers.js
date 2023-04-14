const taskModal = require("../models/taskModel");

async function delTasksController(req, res) {
  // get id from params
  const { taskid: id } = req.params;

  try {
    const returnedDataFromDbAfterDel = await taskModal.findByIdAndDelete(id);
    res.status(200).json({
      message: "task removed successfully",
      taskInfo: returnedDataFromDbAfterDel,
    });
  } catch (error) {
    res.status(400).json({ message: "Task can't be deleted" });
  }
}

module.exports = delTasksController;
