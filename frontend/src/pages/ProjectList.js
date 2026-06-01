import React, { useState, useEffect } from 'react';
import { projectService } from '../services/dataService';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const params = {};
    if (filter) params.status = filter;
    if (search) params.search = search;
    projectService.findAll(params)
      .then(res => setProjects(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [filter, search]);

  return (
    <div className="container">
      <div className="page-header">
        <h1>Projetos</h1>
        {user?.role === 'CLIENT' && (
          <Link to="/projects/new" className="btn btn-primary">+ Novo Projeto</Link>
        )}
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <input type="text" className="form-input" placeholder="Buscar projetos..."
          style={{ maxWidth: 300 }} value={search}
          onChange={e => setSearch(e.target.value)} />
        <select className="form-input" style={{ maxWidth: 200 }} value={filter}
          onChange={e => setFilter(e.target.value)}>
          <option value="">Todos os status</option>
          <option value="OPEN">Abertos</option>
          <option value="IN_PROGRESS">Em Andamento</option>
          <option value="COMPLETED">Concluídos</option>
        </select>
      </div>

      {loading ? (
        <div className="loading"><div className="spinner" /></div>
      ) : projects.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888', padding: '3rem' }}>
          Nenhum projeto encontrado.
        </p>
      ) : (
        <div className="projects-grid">
          {projects.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      )}
    </div>
  );
}
