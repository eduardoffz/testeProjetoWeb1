import api from './api';

export const authService = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
};

export const userService = {
  findAll: (role) => api.get('/users', { params: { role } }),
  findById: (id) => api.get(`/users/${id}`),
  getMe: () => api.get('/users/me'),
  updateProfile: (data) => api.put('/users/me', data),
};

export const projectService = {
  findAll: (params) => api.get('/projects', { params }),
  findById: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
  findByClient: (clientId) => api.get(`/projects/client/${clientId}`),
  findByFreelancer: (freelancerId) => api.get(`/projects/freelancer/${freelancerId}`),
  assignFreelancer: (id, freelancerId) => api.post(`/projects/${id}/assign/${freelancerId}`),
  complete: (id) => api.post(`/projects/${id}/complete`),
};

export const proposalService = {
  create: (projectId, data) => api.post(`/projects/${projectId}/proposals`, data),
  findByProject: (projectId) => api.get(`/projects/${projectId}/proposals`),
  myProposals: () => api.get('/proposals/mine'),
  accept: (id) => api.post(`/proposals/${id}/accept`),
  reject: (id) => api.post(`/proposals/${id}/reject`),
};

export const reviewService = {
  create: (projectId, reviewedId, data) => api.post(`/projects/${projectId}/reviews/${reviewedId}`, data),
  findByUser: (userId) => api.get(`/users/${userId}/reviews`),
  findByProject: (projectId) => api.get(`/projects/${projectId}/reviews`),
};
