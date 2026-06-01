import React from 'react';
import { Link } from 'react-router-dom';

const statusLabels = {
  OPEN: 'Aberto', IN_PROGRESS: 'Em Andamento', COMPLETED: 'Concluído', CANCELLED: 'Cancelado',
};

export default function ProjectCard({ project }) {
  const budget = project.budgetMin
    ? `R$ ${Number(project.budgetMin).toLocaleString('pt-BR')} - R$ ${Number(project.budgetMax).toLocaleString('pt-BR')}`
    : 'Orçamento a combinar';

  const techs = project.techRequirements?.split(',').map(t => t.trim()) || [];

  return (
    <Link to={`/projects/${project.id}`} style={{ textDecoration: 'none' }}>
      <div className="card">
        <div className="project-card-header">
          <h3>{project.title}</h3>
          <span className={`badge badge-${project.status.toLowerCase()}`}>
            {statusLabels[project.status]}
          </span>
        </div>
        <p className="project-card-desc">{project.description}</p>
        <div>
          {techs.map((t, i) => <span key={i} className="tag tag-tech">{t}</span>)}
        </div>
        <div className="project-card-footer">
          <span className="project-card-budget">{budget}</span>
          <span>{project.clientName}</span>
        </div>
      </div>
    </Link>
  );
}
