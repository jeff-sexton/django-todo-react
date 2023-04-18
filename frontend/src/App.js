import React, { useState, useEffect } from "react";

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

const TabList = ({ displayCompleted, viewCompleted }) => {
  return (
    <div className="nav nav-tabs">
      <span
        className={viewCompleted ? "nav-link active" : "nav-link"}
        onClick={() => displayCompleted(true)}
      >
        Complete
      </span>
      <span
        className={viewCompleted ? "nav-link" : "nav-link active"}
        onClick={() => displayCompleted(false)}
      >
        Incomplete
      </span>
    </div>
  );
};

const TodoList = ({ todoItems, viewCompleted }) => {
  const items = todoItems.filter((item) => item.completed === viewCompleted);

  return items.map(({ id, description, title }) => (
    <li
      key={id}
      className="list-group-item d-flex justify-content-between align-items-center"
    >
      <span
        className={`todo-title mr-2 ${
          viewCompleted ? "completed-todo" : ""
        }`}
        title={description}
      >
        {title}
      </span>
      <span>
        <button className="btn btn-secondary mr-2">Edit</button>
        <button className="btn btn-danger">Delete</button>
      </span>
    </li>
  ));
};

const App = () => {
  const [viewCompleted, setViewCompleted] = useState(false);
  const [toDoItems, setTodoItems] = useState([]);

  useEffect(() => {
    setTodoItems(initialTodoItems)
  },
  [])



  const displayCompleted = (status) => {
    console.log('\n\n ============== displayCompleted ', status)

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
            <TabList viewCompleted={viewCompleted} displayCompleted={displayCompleted} />
            <ul className="list-group list-group-flush border-top-0">
              <TodoList viewCompleted={viewCompleted} todoItems={toDoItems}/>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
