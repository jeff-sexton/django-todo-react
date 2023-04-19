import { render, screen } from '@testing-library/react';
import TabList from "./TabList";

test('Complete tab is inactive by default', () => {
  render(<TabList />);
  const completeTab = screen.getByText(/^Complete$/i);
  expect(completeTab).toHaveClass("nav-link");
  expect(completeTab).not.toHaveClass("active");
})

test('Complete tab is active when viewCompleted is true', () => {
  render(<TabList viewCompleted={true} />);
  const completeTab = screen.getByText(/^Complete$/i);
  expect(completeTab).toHaveClass("nav-link");
  expect(completeTab).toHaveClass("active");
})

test('clicking Complete tab calls displayCompleted with true', () => {
  const displayCompleted = jest.fn();
  render(<TabList displayCompleted={displayCompleted} />);
  const completeTab = screen.getByText(/^Complete$/i);
  completeTab.click();
  expect(displayCompleted).toHaveBeenCalledWith(true);
})

test('clicking Incomplete tab calls displayCompleted with false', () => {
  const displayCompleted = jest.fn();
  render(<TabList viewCompleted={true} displayCompleted={displayCompleted} />);
  const IncompleteTab = screen.getByText(/^Incomplete$/i);
  IncompleteTab.click();
  expect(displayCompleted).toHaveBeenCalledWith(false);
})
