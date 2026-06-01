import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectService } from '../services/dataService';
import { useAuth } from '../contexts/AuthContext';
import ProjectCard from '../components/ProjectCard';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    projectService.findAll({ status: 'OPEN' })
      .then(res => setProjects(res.data.slice(0, 6)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <section className="hero">
        <h1>Encontre o projeto ideal para seu talento</h1>
        <p>Plataforma focada em desenvolvedores. Conectamos freelancers de tecnologia a projetos inovadores.</p>
        <div className="hero-buttons">
          {user ? (
            user.role === 'CLIENT' ? (
              <Link to="/projects/new" className="btn btn-primary">Publicar Projeto</Link>
            ) : (
              <Link to="/projects" className="btn btn-primary">Explorar Projetos</Link>
            )
          ) : (
            <>
              <Link to="/register" className="btn btn-primary">Começar Agora</Link>
              <Link to="/projects" className="btn btn-secondary">Ver Projetos</Link>
            </>
          )}
        </div>
      </section>

      <div className="container">
        <div className="page-header">
          <h1>Projetos Recentes</h1>
          <Link to="/projects" className="btn btn-secondary">Ver Todos</Link>
        </div>

        {loading ? (
          <div className="loading"><div className="spinner" /></div>
        ) : (
          <div className="projects-grid">
            {projects.map(p => <ProjectCard key={p.id} project={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
