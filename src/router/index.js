import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from '../pages/Auth';
import Signup from '../pages/Signup';
import TodoApp from '../pages/Todo';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<Auth />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/app" element={<TodoApp />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;