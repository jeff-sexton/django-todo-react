import React, { useState, useEffect } from "react";
import ToDoList from "./components/TodoList";
import TabList from "./components/TabList";
import ToDoModal from "./components/ToDoModal";

const App = () => {
  const [viewCompleted, setViewCompleted] = useState(false);
  const [toDoItems, setTodoItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeToDo, setActiveToDo] = useState({
    title: "",
    description: "",
    completed: false,
  });

  const refreshToDos = async () => {
    try {
      const res = await fetch("/api/todos/");

      const data = await res.json();

      setTodoItems(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    refreshToDos();
  }, []);

  const displayCompleted = (status) => {
    setViewCompleted(status);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleSubmit = async (item) => {
    let url = "/api/todos/";
    const requestOptions = {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(item),
    };

    // Handle edits to existing to dos
    if (item.id) {
      url = url + `${item.id}/`;
      requestOptions.method = "put";
    }

    try {
      await fetch(url, requestOptions);
      await refreshToDos();
      toggleModal();
    } catch (error) {
      console.log(error);
    }
  };

  const createItem = () => {
    const item = { title: "", description: "", completed: false };
    setActiveToDo(item);
    toggleModal();
  };

  const handleDelete = async (item) => {
    try {
      await fetch(`/api/todos/${item.id}/`, {
        method: "delete",
        headers: {
          "content-type": "application/json",
        },
      });
      await refreshToDos();
    } catch (error) {
      console.log(error);
    }
  };

  const editItem = (item) => {
    setActiveToDo(item);
    toggleModal();
  };

  return (
    <main className="container">
      <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
      <div className="row">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <div className="mb-4">
              <button className="btn btn-primary" onClick={createItem}>
                Add task
              </button>
            </div>
            <TabList
              viewCompleted={viewCompleted}
              displayCompleted={displayCompleted}
            />
            <ul className="list-group list-group-flush border-top-0">
              <ToDoList
                viewCompleted={viewCompleted}
                toDoItems={toDoItems}
                editItem={editItem}
                handleDelete={handleDelete}
              />
            </ul>
          </div>
        </div>
      </div>
      {modalOpen ? (
        <ToDoModal
          activeToDo={activeToDo}
          setActiveToDo={setActiveToDo}
          toggleModal={toggleModal}
          onSave={handleSubmit}
        />
      ) : null}
    </main>
  );
};

export default App;
