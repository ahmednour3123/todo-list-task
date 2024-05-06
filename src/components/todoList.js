import React, { useState, useCallback, useMemo } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMediaQuery } from '@mui/material';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const addTodo = useCallback((e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setTodos([...todos, { id: Date.now(), content: inputValue, completed: false }]);
      setInputValue('');
    }
  }, [inputValue, todos]);

  const toggleTodo = useCallback((id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  }, [todos]);

  const deleteTodo = useCallback((id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
    <div style={{ maxWidth: 400, padding: 16, border: '3px solid #ccc', borderRadius: 8 }}>
      <h1 style={{ textAlign: 'center', marginBottom: 16 }}>To-Do List</h1>
      <TodoForm inputValue={inputValue} onAdd={addTodo} onChange={setInputValue} />
      <ul>{todoItems}</ul>
      <p style={{ textAlign: 'center', marginTop: 16 }}>
        Total todos: {totalTodos} 
      </p>
      <p style={{ textAlign: 'center', marginTop: 16 }}>
        Completed todos: {completedTodos}
      </p>
    </div>
  </div>
  );
};

const TodoForm = ({ inputValue, onAdd, onChange }) => {
  return (
    <form onSubmit={onAdd} style={{ display: 'flex', marginBottom: 16 }}>
      <TextField
        variant="outlined"
        label="Add a new task"
        value={inputValue}
        onChange={(e) => onChange(e.target.value)}
        style={{ flex: 1, marginRight: 8 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </form>
  );
};

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <li style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
      <Checkbox
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          marginLeft: 8,
          flex: 1
        }}
      >
        {todo.content}
      </span>
      <IconButton onClick={() => onDelete(todo.id)} style={{ marginLeft: 'auto' }}>
        <DeleteIcon />
      </IconButton>
    </li>
  );
};

export default TodoList;
