import { render, screen } from '@testing-library/react';
import ToDoList from './TodoList';

test('renders a list of to do items', () => {
  const toDoItems = [
    { id: 1, title: 'Test 1', description: 'Test 1 description', completed: false },
    { id: 2, title: 'Test 2', description: 'Test 2 description', completed: false },
    { id: 3, title: 'Test 3', description: 'Test 3 description', completed: false },
  ];
  render(<ToDoList toDoItems={toDoItems} viewCompleted={false} />);
  const listItems = screen.getAllByRole('listitem');
  expect(listItems).toHaveLength(3);
})

test('displays only incomplete to do items by default', () => {
  const toDoItems = [
    { id: 1, title: 'Test 1', description: 'Test 1 description', completed: false },
    { id: 2, title: 'Test 2', description: 'Test 2 description', completed: true },
    { id: 3, title: 'Test 3', description: 'Test 3 description', completed: false },
  ];
  render(<ToDoList toDoItems={toDoItems} viewCompleted={false} />);
  const listItems = screen.getAllByRole('listitem');
  expect(listItems).toHaveLength(2);
})

test('displays only completed to do items when viewCompleted is true', () => {
  const toDoItems = [
    { id: 1, title: 'Test 1', description: 'Test 1 description', completed: false },
    { id: 2, title: 'Test 2', description: 'Test 2 description', completed: true },
    { id: 3, title: 'Test 3', description: 'Test 3 description', completed: false },
  ];
  render(<ToDoList toDoItems={toDoItems} viewCompleted={true} />);
  const listItems = screen.getAllByRole('listitem');
  expect(listItems).toHaveLength(1);
})

test('clicking edit button calls editItem with the correct item', () => {
  const toDoItems = [
    { id: 1, title: 'Test 1', description: 'Test 1 description', completed: false },
    { id: 2, title: 'Test 2', description: 'Test 2 description', completed: true },
    { id: 3, title: 'Test 3', description: 'Test 3 description', completed: false },
  ];
  const editItem = jest.fn();
  render(<ToDoList toDoItems={toDoItems} viewCompleted={false} editItem={editItem} />);
  const editButton = screen.getAllByRole('button', { name: /edit/i })[0];
  editButton.click();
  expect(editItem).toHaveBeenCalledWith(toDoItems[0]);
})

test('clicking delete button calls handleDelete with the correct item', () => {
  const toDoItems = [
    { id: 1, title: 'Test 1', description: 'Test 1 description', completed: false },
    { id: 2, title: 'Test 2', description: 'Test 2 description', completed: true },
    { id: 3, title: 'Test 3', description: 'Test 3 description', completed: false },
  ];
  const handleDelete = jest.fn();
  render(<ToDoList toDoItems={toDoItems} viewCompleted={false} handleDelete={handleDelete} />);
  const deleteButton = screen.getAllByRole('button', { name: /delete/i })[0];
  deleteButton.click();
  expect(handleDelete).toHaveBeenCalledWith(toDoItems[0]);
})
