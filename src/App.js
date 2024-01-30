import React from 'react';
import './App.scss';
import Home from './pages/Home';
import AddTodo from './pages/AddTodo';
import EditTodo from './pages/EditTodo';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Routes>
        <Route  path="/" element={<Home />} />
        <Route  path="/add-todo" element={<AddTodo />} />
        <Route  path="/edit-todo/:id" element={<EditTodo />} />
      </Routes>
    </>
  );
}

export default App;
