import "./App.css";
import TaskForm from "./components/TaskForm";
import "bootstrap/dist/css/bootstrap.css";
import Tasks from "./components/Tasks";

function App() {
  return (
    <div className="App">
      <TaskForm />
      <Tasks />
    </div>
  );
}

export default App;
