import React, { useState, useCallback, useMemo } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = useCallback((e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setTodos([...todos, { id: Date.now(), content: inputValue, completed: false }]);
      setInputValue('');
    }
  }, [inputValue, todos]);

  const toggleTodo = useCallback((id) => {
    setTodos(
      todos.map((todo) => (todo.id === id? {...todo, completed:!todo.completed } : todo))
    );
  }, [todos]);

  const deleteTodo = useCallback((id) => {
    setTodos(todos.filter((todo) => todo.id!== id));
  }, [todos]);

  const todoItems = useMemo(() => {
    return todos.map((todo) => (
      <TodoItem
        key={todo.id}
        todo={todo}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    ));
  }, [todos, toggleTodo, deleteTodo]);

  const totalTodos = useMemo(() => {
    return todos.length;
  }, [todos]);

  const completedTodos = useMemo(() => {
    return todos.filter((todo) => todo.completed).length;
  }, [todos]);

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm inputValue={inputValue} onAdd={addTodo} onChange={setInputValue} />
      <ul>
        {todoItems}
      </ul>
      <p>
        Total todos: {totalTodos} Completed todos: {completedTodos}
      </p>
    </div>
  );
};

const TodoForm = ({ inputValue, onAdd, onChange }) => {
  return (
    <form onSubmit={onAdd}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Add a new todo"
      />
      <button type="submit">Add</button>
    </form>
  );
};

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span style={{ textDecoration: todo.completed? 'line-through' : 'none' }}>
        {todo.content}
      </span>
      <button type="button" onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </li>
  );
};

export default TodoList;