import React, { useEffect, useState } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1/todos')
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  const handleAddTask = () => {
    if (newTask.trim() === '') {
      alert('Task name cannot be empty');
      return;
    }

    const newTodo = {
      id: todos.length + 1,
      title: newTask,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setNewTask('');
  };

  const handleToggleComplete = (todoId) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleEditTask = (todoId, newTitle) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, title: newTitle } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDeleteTask = (todoId) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos);
  };

  const filteredTodos =
    filter === 'completed'
      ? todos.filter((todo) => todo.completed)
      : filter === 'active'
        ? todos.filter((todo) => !todo.completed)
        : todos;

  return (
    <div className='container-fluid mt-3'>
      <div className="input col-4 d-flex">
        <input
          className='form-control '
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAddTask}>Add</button>
      </div>
      <div>
        <button className="btn btn-secondary" onClick={() => setFilter('all')}>All</button>
        <button className="btn btn-warning" onClick={() => setFilter('active')}>Active</button>
        <button className="btn btn-success" onClick={() => setFilter('completed')}>Completed</button >
      </div>
      <hr />
      <div  className="container-fluid">
        <ul style={{gap:'15px',display:'flex',flexFlow:'column'}} className='bg-light'>
          {filteredTodos.map((todo) => (
            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
              <span onClick={() => handleToggleComplete(todo.id)}>
                {todo.title}
              </span>
              <button className="btn btn-primary" onClick={() => handleEditTask(todo.id, prompt('Edit task:', todo.title))}>Edit</button>
              <button className="btn btn-primary" onClick={() => handleDeleteTask(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoApp;
