import { Container } from "react-bootstrap";

const tasks = [
  { id: 1, title: "title1", desc: "desc" },
  { id: 2, title: "title2", desc: "desc" },
];

export default function Tasks() {
  return (
    <Container className="card py-4">
      <div className="card-title mb-4" style={{ fontSize: "24px" }}>
        Tasks List
      </div>
      {tasks.map((item) => (
        <Container className="card shadow-sm mb-2" key={item.id}>
          <div className="title">{item.title}</div>
          <div className="description">{item.desc}</div>
          <div className="buttons d-flex">
            <button type="button" class="btn btn-info">
              edit
            </button>
            <button type="button" class="btn btn-danger">
              delete
            </button>
          </div>
        </Container>
      ))}
    </Container>
  );
}
