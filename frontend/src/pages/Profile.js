import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { userService, reviewService } from '../services/dataService';
import { useAuth } from '../contexts/AuthContext';
import ProfileEdit from '../components/ProfileEdit';

export default function Profile() {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);

  const userId = id || currentUser?.id;

  useEffect(() => {
    if (!userId) return;
    Promise.all([
      userService.findById(userId),
      reviewService.findByUser(userId).catch(() => []),
    ]).then(([u, r]) => {
      setProfile(u.data);
      setReviews(r.data || []);
    }).finally(() => setLoading(false));
  }, [userId, showEdit]);

  const handleProfileUpdated = (updated) => {
    setProfile(updated);
    setShowEdit(false);
  };

  if (loading) return <div className="loading"><div className="spinner" /></div>;
  if (!profile) return <div className="container"><p>Usuário não encontrado.</p></div>;

  const isOwn = currentUser?.id === profile.id || currentUser?.id === userId;
  const techs = profile.techSkills?.split(',').map(t => t.trim()) || [];

  if (showEdit) {
    return <ProfileEdit profile={profile} onSaved={handleProfileUpdated} onCancel={() => setShowEdit(false)} />;
  }

  return (
    <div className="container" style={{ maxWidth: 800, margin: '0 auto' }}>
      <div className="profile-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 className="profile-name">{profile.name}</h1>
            <div className="profile-meta">
              <span>{profile.role === 'FREELANCER' ? 'Freelancer' : profile.role === 'CLIENT' ? 'Cliente' : 'Admin'}</span>
              <span>{profile.email}</span>
              {profile.averageRating > 0 && (
                <span className="stars">{'★'.repeat(Math.round(profile.averageRating))} {profile.averageRating.toFixed(1)}</span>
              )}
            </div>
          </div>
          {isOwn && (
            <button className="btn btn-secondary btn-sm" onClick={() => setShowEdit(true)}>Editar Perfil</button>
          )}
        </div>

        {profile.bio && <p style={{ color: '#555', lineHeight: 1.8 }}>{profile.bio}</p>}

        {techs.length > 0 && (
          <div className="profile-skills">
            {techs.map((t, i) => <span key={i} className="tag tag-tech">{t}</span>)}
          </div>
        )}

        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem' }}>
          {profile.githubUrl && (
            <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#333', textDecoration: 'none' }}>
              GitHub
            </a>
          )}
          {profile.linkedinUrl && (
            <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#333', textDecoration: 'none' }}>
              LinkedIn
            </a>
          )}
        </div>
      </div>

      {reviews.length > 0 && (
        <div className="detail-section">
          <h2>Avaliações Recebidas</h2>
          {reviews.map(r => (
            <div key={r.id} className="proposal-item">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                <span className="stars">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                <span style={{ color: '#888', fontSize: '0.85rem' }}>
                  {r.reviewerName} - {r.projectTitle}
                </span>
              </div>
              {r.comment && <p style={{ color: '#555', fontSize: '0.9rem' }}>{r.comment}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
