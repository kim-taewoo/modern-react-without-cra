import axios from 'axios';

export async function signup(email, name, file, password) {
  const headers = { 'content-type': 'multipart/form-data' };
  const formData = new FormData();

  formData.append('email', email);
  formData.append('name', name);
  formData.append('password', password);
  formData.append('file', file);

  const { data: result } = await axios.post(`/api/user/join`, formData, { headers });
  return result;
}

export async function login(email = '', password = '') {
  const { data: result } = await axios.post('/api/auth', {
    email,
    password,
  });
  return result;
}

export async function me(token) {
  const headers = {
    Authorization: 'Bearer ' + token,
  };

  const { data: result } = await axios.get('/api/user/me', { headers });
  return result;
}

export function setToken(token) {
  window.localStorage.setItem('token', JSON.stringify(token));
}

export function getToken() {
  return JSON.parse(window.localStorage.getItem('token'));
}