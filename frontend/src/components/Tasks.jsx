import { useContext } from "react";
import { Container } from "react-bootstrap";
import taskCtx from "../contaxt/TaskCtx";

// const tasks = [
//   { id: 1, title: "title1", desc: "desc" },
//   { id: 2, title: "title2", desc: "desc" },
// ];

export default function Tasks() {
  const { showAddTaskModalHandler, tasks, removeDeletedTaskFromTaskState } =
    useContext(taskCtx);
  // on first load useEffect fetch data from api/tasks

  tasks;

  const deleteHandler = async (taskId) => {
    taskId;

    try {
      const responseObj = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(
        `http://localhost:5000/api/tasks/${taskId}`,
        responseObj
      );
    } catch (error) {
      error;
    }

    removeDeletedTaskFromTaskState(taskId);
  };

  return (
    <Container className="card py-4">
      <div className="card-title mb-4" style={{ fontSize: "24px" }}>
        Tasks List
      </div>
      <button
        type="button"
        className="btn btn-primary d-inlin-block"
        onClick={() => showAddTaskModalHandler({ show: true, edit: false })}
      >
        add task
      </button>
      {!!tasks.length &&
        tasks.map((item) => (
          <Container className="card shadow-sm mb-2 py-4" key={item._id}>
            <div className="title mb-2" style={{ fontWeight: "bold" }}>
              {item.title}
            </div>
            <div className="description mb-2">{item.description}</div>
            <div className="buttons d-flex">
              <button
                type="button"
                className="btn btn-info"
                onClick={() =>
                  showAddTaskModalHandler({
                    show: true,
                    edit: true,
                    _id: item._id,
                    title: item.title,
                    desc: item.description,
                  })
                }
              >
                edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => deleteHandler(item._id)}
              >
                delete
              </button>
            </div>
          </Container>
        ))}
    </Container>
  );
}
