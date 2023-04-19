import { render, screen } from "@testing-library/react";
import ToDoModal from "./ToDoModal";

test("renders the modal", () => {
  const toDo = {
    id: 1,
    title: "",
    description: "Test 1 description",
    completed: false,
  }
  render(<ToDoModal activeToDo={toDo}/>);
  const modal = screen.getByRole("dialog");
  expect(modal).toBeInTheDocument();
})

test("renders the modal with an empty to do item", () => {
  const toDo = {
    title: "",
    description: "",
    completed: false,
  }
  render(<ToDoModal activeToDo={toDo}/>);
  const titleInput = screen.getByRole("textbox", { name: /title/i });
  expect(titleInput).toHaveValue("");
  const descriptionInput = screen.getByRole("textbox", { name: /description/i });
  expect(descriptionInput).toHaveValue("");
})
