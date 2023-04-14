const express = require("express");
const getTasksController = require("../controllers/getTasksController");
const addTasksController = require("../controllers/addTasksController");
const delTasksController = require("../controllers/delTasksControllers");
const editTasksController = require("../controllers/editTasksController");
const router = express.Router();

router.route("/").get(getTasksController).post(addTasksController);
router.route("/:taskid").delete(delTasksController).put(editTasksController);

module.exports = router;
