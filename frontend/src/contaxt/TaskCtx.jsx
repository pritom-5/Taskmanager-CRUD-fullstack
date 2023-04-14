import { createContext, useEffect, useState } from "react";

const initialContextValues = {
  showAddTaskModal: { show: false, edit: false, _id: "", title: "", desc: "" },
  showAddTaskModalHandler: () => {},
  tasks: [],
  pushNewTaskToTaskState: () => {},
  removeDeletedTaskFromTaskState: () => {},
};

const taskCtx = createContext(initialContextValues);

export function TaskContextProvider({ children }) {
  // task form modal control state
  const [showAddTaskModal, setShowAddTaskModal] = useState({
    show: false,
    edit: false,
    _id: null,
    title: "",
    desc: "",
  });

  // list of tasks state
  const [tasksState, setTasksState] = useState([]);

  // load all the tasks on first mount and add temporary tasks to state when
  // tasks are added
  useEffect(() => {
    const fetchFn = async () => {
      const response = await fetch("http://localhost:5000/api/tasks");
      const data = await response.json();

      if (!data) {
        throw new Error("something went wrong while fetching data");
      }

      const { message, tasks } = data;
      setTasksState(tasks);
    };

    try {
      fetchFn();
    } catch (error) {
      error;
    }
  }, []);

  // append new task to tasksState to show in realtime.
  const pushNewTaskToTaskState = (taskInfo) => {
    const { title, description, _id } = taskInfo;

    // check if task already exists
    const existingTaskIndex = tasksState.findIndex((item) => item._id === _id);

    const existingTask = tasksState[existingTaskIndex];

    // edit case
    if (existingTask) {
      setTasksState((prev) => {
        const tempTasks = [...prev];
        tempTasks[existingTaskIndex].title = title;
        tempTasks[existingTaskIndex].description = description;

        tempTasks;

        ("prev");

        return tempTasks;
      });
      // close the modal after submit only for edit
      setShowAddTaskModal((prev) => {
        ("modal");
        return { ...prev, show: false };
      });
      ("main");
      return;
    }

    // add new task case
    setTasksState((prev) => {
      return [...prev, { _id, title, description }];
    });
  };

  // delete task case
  const removeDeletedTaskFromTaskState = (id) => {
    const tempData = [...tasksState];

    tempData;

    const filteredDataAfterRemovingTask = tempData.filter(
      (item) => item._id !== id
    );

    setTasksState(filteredDataAfterRemovingTask);
  };

  // taskModalInfo = {show: bool, edit: bool, id: '', title: '', desc: ''}
  const showAddTaskModalHandler = (taskModalInfo) => {
    const { show, _id, edit, title, desc } = taskModalInfo;

    if (!edit) {
      setShowAddTaskModal({
        show,
        edit: false,
        _id,
        title: "",
        desc: "",
      });
      return;
    }

    setShowAddTaskModal({
      show,
      edit,
      _id,
      title,
      desc,
    });
  };

  return (
    <taskCtx.Provider
      value={{
        showAddTaskModal,
        showAddTaskModalHandler,
        tasks: tasksState,
        pushNewTaskToTaskState,
        removeDeletedTaskFromTaskState,
      }}
    >
      {children}
    </taskCtx.Provider>
  );
}

export default taskCtx;
