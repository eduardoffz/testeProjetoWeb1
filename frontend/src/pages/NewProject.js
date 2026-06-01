import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectService } from '../services/dataService';

export default function NewProject() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '', description: '', techRequirements: '',
    budgetMin: '', budgetMax: '', estimatedDays: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = {
        ...form,
        budgetMin: form.budgetMin ? parseFloat(form.budgetMin) : null,
        budgetMax: form.budgetMax ? parseFloat(form.budgetMax) : null,
        estimatedDays: form.estimatedDays ? parseInt(form.estimatedDays) : null,
      };
      const res = await projectService.create(data);
      navigate(`/projects/${res.data.id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao criar projeto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 700, margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem' }}>Novo Projeto</h1>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Título</label>
          <input type="text" className="form-input" name="title" value={form.title}
            onChange={handleChange} placeholder="Ex: API REST para E-commerce" required />
        </div>
        <div className="form-group">
          <label>Descrição</label>
          <textarea className="form-input" name="description" value={form.description}
            onChange={handleChange} placeholder="Descreva o projeto em detalhes..." required />
        </div>
        <div className="form-group">
          <label>Tecnologias Requeridas</label>
          <input type="text" className="form-input" name="techRequirements" value={form.techRequirements}
            onChange={handleChange} placeholder="Ex: Java, Spring, React, PostgreSQL" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label>Orçamento Mínimo (R$)</label>
            <input type="number" className="form-input" name="budgetMin" value={form.budgetMin}
              onChange={handleChange} placeholder="5000" />
          </div>
          <div className="form-group">
            <label>Orçamento Máximo (R$)</label>
            <input type="number" className="form-input" name="budgetMax" value={form.budgetMax}
              onChange={handleChange} placeholder="15000" />
          </div>
        </div>
        <div className="form-group">
          <label>Dias Estimados</label>
          <input type="number" className="form-input" name="estimatedDays" value={form.estimatedDays}
            onChange={handleChange} placeholder="30" />
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Publicando...' : 'Publicar Projeto'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
