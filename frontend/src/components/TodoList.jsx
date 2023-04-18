import React from "react";

const ToDoList = ({ todoItems, viewCompleted }) => {
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

export default ToDoList
