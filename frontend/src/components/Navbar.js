import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        {'<'}DevFreela<span>{'/>'}</span>
      </Link>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/projects">Projetos</Link></li>
        {user && (
          <>
            <li><Link to="/my-projects">Meus Projetos</Link></li>
            <li><Link to="/profile">Perfil</Link></li>
          </>
        )}
      </ul>
      <div className="navbar-user">
        {user ? (
          <>
            <span>{user.name || user.email}</span>
            <button className="btn btn-outline btn-sm" onClick={handleLogout}>Sair</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline btn-sm">Entrar</Link>
            <Link to="/register" className="btn btn-primary btn-sm">Cadastrar</Link>
          </>
        )}
      </div>
    </nav>
  );
}
