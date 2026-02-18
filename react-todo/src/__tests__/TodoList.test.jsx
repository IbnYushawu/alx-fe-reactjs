import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from '../components/TodoList.jsx';

describe('TodoList Component', () => {
  test('renders initial todos', () => {
    render(<TodoList />);
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
  });

  test('adds a new todo', async () => {
    render(<TodoList />);
    const input = screen.getByTestId('new-todo-input');
    const button = screen.getByTestId('add-todo-button');

    await userEvent.type(input, 'New Todo');
    await userEvent.click(button);

    expect(screen.getByText('New Todo')).toBeInTheDocument();
  });

  test('toggles a todo', () => {
    render(<TodoList />);
    const todo = screen.getByText('Learn React');

    expect(todo).not.toHaveStyle('text-decoration: line-through');

    fireEvent.click(todo);

    expect(todo).toHaveStyle('text-decoration: line-through');
  });

  test('deletes a todo', () => {
    render(<TodoList />);
    
    const todo = screen.getByText('Write Tests').closest('li');

    const deleteButton = within(todo).getByText('Delete');

    fireEvent.click(deleteButton);

    expect(todo).not.toBeInTheDocument();
  });
});
