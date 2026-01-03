import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Auth from './Auth';
import './App.css';

const API_URL = 'http://localhost:5000/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));

  // Lấy danh sách todos
  useEffect(() => {
    if (token) {
      fetchTodos();
    }
  }, [token]);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
      if (error.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setTodos([]);
  };

  // Thêm todo mới
  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    try {
      const response = await axios.post(API_URL, 
        { text: inputText },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      setTodos([...todos, response.data]);
      setInputText('');
    } catch (error) {
      console.error('Error adding todo:', error);
      alert('Không thể thêm todo');
    }
  };

  // Toggle completed
  const handleToggleTodo = async (id) => {
    try {
      const response = await axios.patch(
        `${API_URL}/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` }}
      );
      setTodos(todos.map(todo => 
        todo._id === id ? response.data : todo
      ));
    } catch (error) {
      console.error('Error toggling todo:', error);
      alert('Không thể cập nhật todo');
    }
  };

  // Xóa todo
  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
      alert('Không thể xóa todo');
    }
  };

  // Nếu chưa login, hiển thị form đăng nhập
  if (!token) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <h1> Todo App</h1>
          <div className="user-info">
            <span> {user?.username}</span>
            <button onClick={handleLogout} className="logout-button">
              Đăng xuất
            </button>
          </div>
        </div>
        
        <form onSubmit={handleAddTodo} className="todo-form">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Nhập công việc mới..."
            className="todo-input"
          />
          <button type="submit" className="add-button">
            Thêm
          </button>
        </form>

        {loading ? (
          <p className="loading">Đang tải...</p>
        ) : (
          <ul className="todo-list">
            {todos.length === 0 ? (
              <li className="empty-message">Chưa có công việc nào</li>
            ) : (
              todos.map((todo) => (
                <li key={todo._id} className="todo-item">
                  <div className="todo-content">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggleTodo(todo._id)}
                      className="todo-checkbox"
                    />
                    <span className={todo.completed ? 'completed' : ''}>
                      {todo.text}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteTodo(todo._id)}
                    className="delete-button"
                  >
                    🗑️
                  </button>
                </li>
              ))
            )}
          </ul>
        )}

        <div className="stats">
          <p>Tổng số: {todos.length} | Hoàn thành: {todos.filter(t => t.completed).length}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
