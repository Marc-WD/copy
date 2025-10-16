import api from './api';

export const savePlan = (data) => api.post('/plans', data).then(r=>r.data);
export const fetchMyPlans = () => api.get('/plans/mine').then(r=>r.data);
