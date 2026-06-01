import React, { useState } from 'react';
import { userService } from '../services/dataService';

export default function ProfileEdit({ profile, onSaved, onCancel }) {
  const [form, setForm] = useState({
    name: profile.name || '',
    bio: profile.bio || '',
    techSkills: profile.techSkills || '',
    githubUrl: profile.githubUrl || '',
    linkedinUrl: profile.linkedinUrl || '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await userService.updateProfile(form);
      onSaved(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao atualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 700, margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem' }}>Editar Perfil</h1>
      {error && <div className="alert alert-error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome</label>
          <input type="text" className="form-input" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Bio</label>
          <textarea className="form-input" name="bio" value={form.bio} onChange={handleChange} rows={4} />
        </div>
        <div className="form-group">
          <label>Habilidades Técnicas</label>
          <input type="text" className="form-input" name="techSkills" value={form.techSkills} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>GitHub URL</label>
          <input type="url" className="form-input" name="githubUrl" value={form.githubUrl} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>LinkedIn URL</label>
          <input type="url" className="form-input" name="linkedinUrl" value={form.linkedinUrl} onChange={handleChange} />
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
