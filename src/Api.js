import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

const api = axios.create({
  baseURL: REACT_APP_API_URL,
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

class Api {
  static login(data) {
    return api.post('/user/login', data);
  }

  static register(data) {
    return api.post('/user/register', data);
  }

  static getUserData(token) {
    return api.post('/user/single', token);
  }

  static blogList(data) {
    return api.get('/blog/list', data);
  }

  static blogData(blogId) {
    return api.get(`/blog/single/${blogId}`);
  }

  static createBlog(userId, formData) {
    return api.post(`/blog/create/${userId}`, formData);
  }

  static deleteBlog(blogId) {
    return api.put(`/blog/delete/${blogId}`);
  }

  static blogUpdate(userId, blogId, formData) {
    return api.put(`/blog/update/${userId}/${blogId}`, formData);
  }
}

export default Api;
