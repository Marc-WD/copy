import api from './api';

export const fetchPolls = () => api.get('/polls').then(r=>r.data);
export const createPoll = (data) => api.post('/polls', data).then(r=>r.data);
export const votePoll = (pollId, optionIndex) => api.post(`/polls/${pollId}/vote`, { optionIndex }).then(r=>r.data);
