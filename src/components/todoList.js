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

  





  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm inputValue={inputValue} onAdd={addTodo} onChange={setInputValue} />
      <ul>
      </ul>
      
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



export default TodoList;