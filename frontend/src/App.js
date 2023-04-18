import React, { useState, useEffect } from "react";
import ToDoList from "./components/TodoList";
import TabList from "./components/TabList";

const initialTodoItems = [
  {
    id: 1,
    title: "Go to Market",
    description: "Buy ingredients to prepare dinner",
    completed: true,
  },
  {
    id: 2,
    title: "Study",
    description: "Read Algebra and History textbook for the upcoming test",
    completed: false,
  },
  {
    id: 3,
    title: "Sammy's books",
    description: "Go to library to return Sammy's books",
    completed: true,
  },
  {
    id: 4,
    title: "Article",
    description: "Write article on how to use Django with React",
    completed: false,
  },
];

const App = () => {
  const [viewCompleted, setViewCompleted] = useState(false);
  const [toDoItems, setTodoItems] = useState([]);

  useEffect(() => {
    setTodoItems(initialTodoItems);
  }, []);

  const displayCompleted = (status) => {
    setViewCompleted(status);
  };

  return (
    <main className="container">
      <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
      <div className="row">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <div className="mb-4">
              <button className="btn btn-primary">Add task</button>
            </div>
            <TabList
              viewCompleted={viewCompleted}
              displayCompleted={displayCompleted}
            />
            <ul className="list-group list-group-flush border-top-0">
              <ToDoList viewCompleted={viewCompleted} todoItems={toDoItems} />
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
