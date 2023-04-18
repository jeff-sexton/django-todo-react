import React from "react";

const ToDoList = ({ todoItems, viewCompleted, editItem, handleDelete }) => {
  const items = todoItems.filter((item) => item.completed === viewCompleted);

  return items.map((item) => {
    const { id, description, title } = item
    return (
      <li
        key={id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${viewCompleted ? "completed-todo" : ""}`}
          title={description}
        >
          {title}
        </span>
        <span>
          <button className="btn btn-secondary mr-2" onClick={() => editItem(item)}>Edit</button>
          <button className="btn btn-danger" onClick={() => handleDelete(item)}>Delete</button>
        </span>
      </li>
    );
  });
};

export default ToDoList
