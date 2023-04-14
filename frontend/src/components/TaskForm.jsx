import { useContext, useRef, useState } from "react";
import { Container, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import taskCtx from "../contaxt/TaskCtx";

export default function TaskForm() {
  const { showAddTaskModal, showAddTaskModalHandler, pushNewTaskToTaskState } =
    useContext(taskCtx);

  const { show, edit, _id, title, desc } = showAddTaskModal;

  const titleRef = useRef();
  const descRef = useRef();
  const formRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();

    const inputTaskTitle = titleRef.current.value;
    const inputTaskDesc = descRef.current.value;

    const data = { title: inputTaskTitle, description: inputTaskDesc };

    let tempid;

    if (edit) {
      tempid = id;
    } else {
      tempid = Math.random().toFixed(3);
    }
    pushNewTaskToTaskState({ ...data, _id: tempid });

    formRef.current.reset();

    if (edit) {
      try {
        const responseObj = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        };
        const response = await fetch(
          `http://localhost:5000/api/tasks/${_id}`,
          responseObj
        );
        const responseData = await response.json();
        return;
      } catch (error) {
        console.log(error);
      }
    }

    const responseObj = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks`,
        responseObj
      );
      const responseData = await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      show={show}
      onHide={() =>
        showAddTaskModalHandler({
          show: false,
          edit: false,
        })
      }
    >
      <Container className="card d-flex justify-content-center shadow-sm">
        <Form className="my-3" onSubmit={submitHandler} ref={formRef}>
          <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Task title"
              required
              ref={titleRef}
              defaultValue={title}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              ref={descRef}
              defaultValue={desc}
            />
          </Form.Group>
          <button type="submit" class="btn btn-primary">
            {edit ? "Edit Task" : "Add Task"}
          </button>
        </Form>
      </Container>
    </Modal>
  );
}
