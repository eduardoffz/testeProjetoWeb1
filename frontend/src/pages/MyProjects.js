import React, { useState, useEffect } from 'react';
import { projectService } from '../services/dataService';
import { useAuth } from '../contexts/AuthContext';
import ProjectCard from '../components/ProjectCard';

export default function MyProjects() {
  const { user } = useAuth();
  const [clientProjects, setClientProjects] = useState([]);
  const [freelancerProjects, setFreelancerProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const promises = [];
    if (user.role === 'CLIENT') {
      promises.push(
        projectService.findByClient(user.id).then(r => setClientProjects(r.data))
      );
    } else {
      promises.push(
        projectService.findByFreelancer(user.id).then(r => setFreelancerProjects(r.data))
      );
    }
    Promise.all(promises).finally(() => setLoading(false));
  }, [user]);

  if (loading) return <div className="loading"><div className="spinner" /></div>;

  return (
    <div className="container">
      {user?.role === 'CLIENT' ? (
        <>
          <div className="page-header">
            <h1>Meus Projetos Publicados</h1>
          </div>
          {clientProjects.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#888', padding: '3rem' }}>
              Você ainda não publicou nenhum projeto.
            </p>
          ) : (
            <div className="projects-grid">
              {clientProjects.map(p => <ProjectCard key={p.id} project={p} />)}
            </div>
          )}
        </>
      ) : (
        <>
          <div className="page-header">
            <h1>Meus Projetos</h1>
          </div>
          {freelancerProjects.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#888', padding: '3rem' }}>
              Você ainda não está alocado em nenhum projeto.
            </p>
          ) : (
            <div className="projects-grid">
              {freelancerProjects.map(p => <ProjectCard key={p.id} project={p} />)}
            </div>
          )}
        </>
      )}
    </div>
  );
}
