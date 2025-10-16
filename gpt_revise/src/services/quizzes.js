import api from './api';

export const fetchQuizzes = () => api.get('/quizzes').then(r=>r.data);
export const createQuiz = (data) => api.post('/quizzes', data).then(r=>r.data);
