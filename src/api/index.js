import axios from 'axios';

const API = axios.create({ baseURL: 'http://127.0.0.1:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});



export const signin = (formData) => API.post('/user/signin', formData);
export const signup = (formData) => API.post('/user/signup', formData);
export const getUsers = () => API.get('/user/users');

export const fetchAllData = () => API.post('/user/import');
export const deleteAllData = () => API.delete('/user/delete');
export const getImportedAccidents = () => API.get('/user/accidents');
export const deleteAll = () => API.delete('/user/delete');
export const deleteAccident = (accident_index) => API.delete(`/user/delete/${accident_index}`);
export const updateAccident = (accident_index, formData) => API.patch(`/user/update/${accident_index}`, formData);
export const getAccident = (accident_index) => API.get(`/user/accident/${accident_index}`);