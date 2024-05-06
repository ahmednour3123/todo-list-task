import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoItem from './TodoItem';

test('renders todo item', () => {
  const todo = { id: 1, content: 'Test todo', completed: false };
  const { getByText } = render(<TodoItem todo={todo} />);
  const todoContent = getByText('Test todo');
  expect(todoContent).toBeInTheDocument();
});
test('calls onToggle when checkbox is clicked', () => {
  const todo = { id: 1, content: 'Test todo', completed: false };
  const onToggle = jest.fn();
  const { getByRole } = render(<TodoItem todo={todo} onToggle={onToggle} />);
  const checkbox = getByRole('checkbox');
  fireEvent.click(checkbox);
  expect(onToggle).toHaveBeenCalledTimes(1);
  expect(onToggle).toHaveBeenCalledWith(1);
});

test('calls onDelete when delete button is clicked', () => {
  const todo = { id: 1, content: 'Test todo', completed: false };
  const onDelete = jest.fn();
  const { getByRole } = render(<TodoItem todo={todo} onDelete={onDelete} />);
  const deleteButton = getByRole('button');
  fireEvent.click(deleteButton);
  expect(onDelete).toHaveBeenCalledTimes(1);
  expect(onDelete).toHaveBeenCalledWith(1);
});
