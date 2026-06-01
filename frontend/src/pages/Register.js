import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'FREELANCER', techSkills: '', githubUrl: '', linkedinUrl: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao cadastrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="logo">{'<'}DevFreela{'/>'}</div>
        <h1>Criar Conta</h1>
        <p>Junte-se à comunidade de desenvolvedores</p>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome</label>
            <input type="text" className="form-input" name="name" value={form.name}
              onChange={handleChange} placeholder="Seu nome completo" required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" className="form-input" name="email" value={form.email}
              onChange={handleChange} placeholder="seu@email.com" required />
          </div>
          <div className="form-group">
            <label>Senha</label>
            <input type="password" className="form-input" name="password" value={form.password}
              onChange={handleChange} placeholder="Mínimo 6 caracteres" required minLength={6} />
          </div>
          <div className="form-group">
            <label>Tipo de Conta</label>
            <select className="form-input" name="role" value={form.role} onChange={handleChange}>
              <option value="FREELANCER">Freelancer (quero trabalhar)</option>
              <option value="CLIENT">Cliente (quero contratar)</option>
            </select>
          </div>
          {form.role === 'FREELANCER' && (
            <>
              <div className="form-group">
                <label>Habilidades Técnicas</label>
                <input type="text" className="form-input" name="techSkills" value={form.techSkills}
                  onChange={handleChange} placeholder="Ex: Java, React, Node.js" />
              </div>
              <div className="form-group">
                <label>GitHub URL</label>
                <input type="url" className="form-input" name="githubUrl" value={form.githubUrl}
                  onChange={handleChange} placeholder="https://github.com/seuprofile" />
              </div>
              <div className="form-group">
                <label>LinkedIn URL</label>
                <input type="url" className="form-input" name="linkedinUrl" value={form.linkedinUrl}
                  onChange={handleChange} placeholder="https://linkedin.com/in/seuprofile" />
              </div>
            </>
          )}
          <button type="submit" className="btn btn-primary" style={{width:'100%'}} disabled={loading}>
            {loading ? 'Cadastrando...' : 'Criar Conta'}
          </button>
        </form>

        <div className="auth-link">
          Já tem conta? <Link to="/login">Entrar</Link>
        </div>
      </div>
    </div>
  );
}
