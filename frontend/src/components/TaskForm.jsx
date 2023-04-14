import { useRef } from "react";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";

export default function TaskForm() {
  const titleRef = useRef();
  const descRef = useRef();
  const formRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const inputTaskTitle = titleRef.current.value;
    const inputTaskDesc = descRef.current.value;

    console.log(inputTaskTitle, inputTaskDesc);

    formRef.current.reset();
  };
  return (
    <div className="task_form_section my-4">
      <Container className="card d-flex justify-content-center shadow-sm">
        <Form className="my-3" onSubmit={submitHandler} ref={formRef}>
          <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Task title"
              required
              ref={titleRef}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={2} ref={descRef} />
          </Form.Group>
          <button type="submit" class="btn btn-primary">
            Add Task
          </button>
        </Form>
      </Container>
    </div>
  );
}
