import { render, screen, fireEvent, act } from "@testing-library/react";
import App from "./App";
import nock from "nock";

// reset nock before each test
beforeEach(() => {
  nock.cleanAll();
});

test("loads the to do items from the API and renders the app", async () => {
  nock("http://localhost:80")
    .get("/api/todos/")
    .reply(200, [
      {
        id: 1,
        title: "Test 1",
        description: "Test 1 description",
        completed: false,
      },
    ]);
  await render(<App />);
  const todoItem = await screen.findByText("Test 1");
  expect(todoItem).toBeInTheDocument();
});

test("can create a new to do item", async () => {
  // Nock initial load
  nock("http://localhost:80")
    .get("/api/todos/")
    .reply(200, [
      {
        id: 1,
        title: "Test 1",
        description: "Test 1 description",
        completed: false,
      },
    ]);

  render(<App />);

  const addButton = screen.getByRole("button", { name: /add/i });
  fireEvent.click(addButton);
  const modal = screen.getByRole("dialog");
  expect(modal).toBeInTheDocument();

  const titleInput = screen.getByRole("textbox", { name: /title/i });
  const descriptionInput = screen.getByRole("textbox", {
    name: /description/i,
  });
  expect(titleInput).toHaveValue("");
  expect(descriptionInput).toHaveValue("");

  // Nock post request
  nock("http://localhost:80").post("/api/todos/").reply(201);
  // Nock load after post request
  nock("http://localhost:80")
    .get("/api/todos/")
    .reply(200, [
      {
        id: 1,
        title: "Test 1",
        description: "Test 1 description",
        completed: false,
      },
      {
        id: 2,
        title: "Test 2",
        description: "Test 2 description",
        completed: false,
      },
    ]);

  titleInput.value = "Test 2";
  descriptionInput.value = "Test 2 description";

  const saveButton = screen.getByRole("button", { name: /save/i });
  fireEvent.click(saveButton);

  const todoItem = await screen.findByText("Test 2");

  expect(modal).not.toBeInTheDocument();
  expect(todoItem).toBeInTheDocument();
});

test("can edit a to do item", async () => {
  // Nock initial load
  nock("http://localhost:80")
    .get("/api/todos/")
    .reply(200, [
      {
        id: 1,
        title: "Test 1",
        description: "Test 1 description",
        completed: false,
      },
    ]);

  render(<App />);

  const todoItem = await screen.findByText("Test 1");
  expect(todoItem).toBeInTheDocument();

  const editButton = screen.getByRole("button", { name: /edit/i });
  fireEvent.click(editButton);

  const modal = screen.getByRole("dialog");
  expect(modal).toBeInTheDocument();

  const titleInput = screen.getByRole("textbox", { name: /title/i });
  const descriptionInput = screen.getByRole("textbox", {
    name: /description/i,
  });
  expect(titleInput).toHaveValue("Test 1");
  expect(descriptionInput).toHaveValue("Test 1 description");

  // Nock put request
  nock("http://localhost:80").put("/api/todos/1/").reply(200);
  // Nock load after put request
  nock("http://localhost:80")
    .get("/api/todos/")
    .reply(200, [
      {
        id: 1,
        title: "Test 1 edited",
        description: "Test 1 description edited",
        completed: false,
      },
    ]);

  titleInput.value = "Test 1 edited";
  descriptionInput.value = "Test 1 description edited";

  const saveButton = screen.getByRole("button", { name: /save/i });
  fireEvent.click(saveButton);

  const todoItemEdited = await screen.findByText("Test 1 edited");
  expect(modal).not.toBeInTheDocument();
  expect(todoItemEdited).toBeInTheDocument();
});

test("can delete a to do item", async () => {
  // Nock initial load
  nock("http://localhost:80")
    .get("/api/todos/")
    .reply(200, [
      {
        id: 1,
        title: "Test 1",
        description: "Test 1 description",
        completed: false,
      },
    ]);

  render(<App />);

  const todoItem = await screen.findByText("Test 1");
  expect(todoItem).toBeInTheDocument();

  // Nock delete request
  nock("http://localhost:80").delete("/api/todos/1/").reply(204);
  // Nock load after delete request
  const refreshNock = nock("http://localhost:80")
    .get("/api/todos/")
    .reply(200, []);

  const deleteButton = screen.getByRole("button", { name: /delete/i });
  fireEvent.click(deleteButton);
  await act(async () => {
    // Wait for the refresh to complete
    while (refreshNock.isDone() === false) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  });
  expect(todoItem).not.toBeInTheDocument();
});
