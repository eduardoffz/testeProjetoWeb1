import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { projectService, proposalService, reviewService } from '../services/dataService';
import { useAuth } from '../contexts/AuthContext';

const statusLabels = {
  OPEN: 'Aberto', IN_PROGRESS: 'Em Andamento', COMPLETED: 'Concluído', CANCELLED: 'Cancelado',
};

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [proposalData, setProposalData] = useState({ coverLetter: '', proposedValue: '', estimatedDays: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    Promise.all([
      projectService.findById(id),
      proposalService.findByProject(id).catch(() => []),
      reviewService.findByProject(id).catch(() => []),
    ]).then(([proj, prop, rev]) => {
      setProject(proj.data);
      setProposals(prop.data || []);
      setReviews(rev.data || []);
    }).catch(() => navigate('/projects'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleProposalSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await proposalService.create(id, {
        ...proposalData,
        proposedValue: parseFloat(proposalData.proposedValue),
        estimatedDays: parseInt(proposalData.estimatedDays) || null,
      });
      setSuccess('Proposta enviada com sucesso!');
      setShowProposalForm(false);
      const res = await proposalService.findByProject(id);
      setProposals(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao enviar proposta');
    }
  };

  const handleAcceptProposal = async (proposalId) => {
    try {
      await proposalService.accept(proposalId);
      const res = await projectService.findById(id);
      setProject(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao aceitar proposta');
    }
  };

  const handleComplete = async () => {
    try {
      const res = await projectService.complete(id);
      setProject(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao concluir projeto');
    }
  };

  if (loading) return <div className="loading"><div className="spinner" /></div>;
  if (!project) return null;

  const isClient = user?.id === project.clientId;
  const isFreelancer = user?.role === 'FREELANCER';
  const hasProposed = proposals.some(p => p.freelancerId === user?.id);
  const techs = project.techRequirements?.split(',').map(t => t.trim()) || [];

  return (
    <div className="detail-page">
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="detail-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>{project.title}</h1>
          <span className={`badge badge-${project.status.toLowerCase()}`}>
            {statusLabels[project.status]}
          </span>
        </div>
        <div className="detail-meta">
          <span>Cliente: <Link to={`/profile/${project.clientId}`}>{project.clientName}</Link></span>
          {project.freelancerName && (
            <span>Freelancer: <Link to={`/profile/${project.freelancerId}`}>{project.freelancerName}</Link></span>
          )}
          {project.estimatedDays && <span>Prazo: {project.estimatedDays} dias</span>}
          {project.budgetMin && (
            <span>Budget: R$ {Number(project.budgetMin).toLocaleString('pt-BR')} - R$ {Number(project.budgetMax).toLocaleString('pt-BR')}</span>
          )}
        </div>
      </div>

      <div className="detail-section">
        <h2>Descrição</h2>
        <p style={{ whiteSpace: 'pre-wrap', color: '#555', lineHeight: 1.8 }}>{project.description}</p>
        <div style={{ marginTop: '1rem' }}>
          {techs.map((t, i) => <span key={i} className="tag tag-tech">{t}</span>)}
        </div>
      </div>

      {project.status === 'OPEN' && isFreelancer && !hasProposed && (
        <div className="detail-section">
          {showProposalForm ? (
            <form onSubmit={handleProposalSubmit}>
              <h2>Enviar Proposta</h2>
              <div className="form-group">
                <label>Carta de Apresentação</label>
                <textarea className="form-input" value={proposalData.coverLetter}
                  onChange={e => setProposalData({...proposalData, coverLetter: e.target.value})}
                  placeholder="Explique por que você é o candidato ideal..." required />
              </div>
              <div className="form-group">
                <label>Valor Proposto (R$)</label>
                <input type="number" className="form-input" value={proposalData.proposedValue}
                  onChange={e => setProposalData({...proposalData, proposedValue: e.target.value})}
                  placeholder="Quanto você cobra?" required />
              </div>
              <div className="form-group">
                <label>Dias Estimados</label>
                <input type="number" className="form-input" value={proposalData.estimatedDays}
                  onChange={e => setProposalData({...proposalData, estimatedDays: e.target.value})}
                  placeholder="Em quantos dias entrega?" />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" className="btn btn-primary">Enviar Proposta</button>
                <button type="button" className="btn btn-secondary"
                  onClick={() => setShowProposalForm(false)}>Cancelar</button>
              </div>
            </form>
          ) : (
            <button className="btn btn-primary" onClick={() => setShowProposalForm(true)}>
              Enviar Proposta
            </button>
          )}
        </div>
      )}

      {isClient && project.status === 'OPEN' && proposals.length > 0 && (
        <div className="detail-section">
          <h2>Propostas Recebidas ({proposals.length})</h2>
          {proposals.filter(p => p.status === 'PENDING').map(p => (
            <div key={p.id} className="proposal-item">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span className="freelancer">
                  <Link to={`/profile/${p.freelancerId}`}>{p.freelancerName}</Link>
                </span>
                <span className="value">R$ {Number(p.proposedValue).toLocaleString('pt-BR')}</span>
              </div>
              <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.8rem' }}>{p.coverLetter}</p>
              {p.estimatedDays && <span style={{ fontSize: '0.85rem', color: '#888' }}>Prazo: {p.estimatedDays} dias</span>}
              <div style={{ marginTop: '0.8rem', display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-primary btn-sm" onClick={() => handleAcceptProposal(p.id)}>Aceitar</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {project.status === 'IN_PROGRESS' && isClient && (
        <div className="detail-section">
          <button className="btn btn-primary" onClick={handleComplete}>Marcar como Concluído</button>
        </div>
      )}

      {reviews.length > 0 && (
        <div className="detail-section">
          <h2>Avaliações</h2>
          {reviews.map(r => (
            <div key={r.id} className="proposal-item">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                <span className="stars">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                <span style={{ color: '#888', fontSize: '0.85rem' }}>{r.reviewerName}</span>
              </div>
              {r.comment && <p style={{ color: '#555', fontSize: '0.9rem' }}>{r.comment}</p>}
            </div>
          ))}
        </div>
      )}

      <Link to="/projects" className="btn btn-secondary">Voltar</Link>
    </div>
  );
}
