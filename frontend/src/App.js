import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProjectList from './pages/ProjectList';
import ProjectDetail from './pages/ProjectDetail';
import NewProject from './pages/NewProject';
import MyProjects from './pages/MyProjects';
import Profile from './pages/Profile';
import './App.css';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading"><div className="spinner" /></div>;
  return user ? children : <Navigate to="/login" />;
}

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) return <div className="loading"><div className="spinner" /></div>;

  return (
    <div className="app">
      {user && <Navbar />}
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/" element={user ? <><Navbar /><Home /><Footer /></> : <Home />} />
        <Route path="/projects" element={<><Navbar /><ProjectList /><Footer /></>} />
        <Route path="/projects/:id" element={<><Navbar /><ProjectDetail /><Footer /></>} />
        <Route path="/projects/new" element={<ProtectedRoute><Navbar /><NewProject /><Footer /></ProtectedRoute>} />
        <Route path="/my-projects" element={<ProtectedRoute><Navbar /><MyProjects /><Footer /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Navbar /><Profile /><Footer /></ProtectedRoute>} />
        <Route path="/profile/:id" element={<><Navbar /><Profile /><Footer /></>} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}
