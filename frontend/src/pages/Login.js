import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await login(email, password);
      navigate(data.role === 'ADMIN' ? '/projects' : '/');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="logo">{'<'}DevFreela{'/>'}</div>
        <h1>Entrar</h1>
        <p>Acesse sua conta para continuar</p>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" className="form-input" value={email}
              onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" required />
          </div>
          <div className="form-group">
            <label>Senha</label>
            <input type="password" className="form-input" value={password}
              onChange={e => setPassword(e.target.value)} placeholder="Sua senha" required />
          </div>
          <button type="submit" className="btn btn-primary" style={{width:'100%'}} disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="auth-link">
          Não tem conta? <Link to="/register">Cadastre-se</Link>
        </div>
      </div>
    </div>
  );
}
