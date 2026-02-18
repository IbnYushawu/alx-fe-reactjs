import { useState } from 'react';

function AddTodoForm({ addTodo }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="New todo"
        data-testid="new-todo-input"
      />
      <button type="submit" data-testid="add-todo-button">Add</button>
    </form>
  );
}

export default AddTodoForm;
