import axios from 'axios';

// this points to our backend route
const API = axios.create({ baseURL: 'http://localhost:5000' });
// const url = "https://chau-memories.herokuapp.com/posts"

// send token back to back-end so back-end middleware can verify user is logged in
// BUG: Doesn't Work /server/middleware/auth.js is where the code gets actually ran
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

// important to return the promise that the axios functions give
export const fetchPosts = () => {
    return axios.get('/posts');
}

export const createPost = (newPost) => {
    return axios.post('/posts', newPost);
}

export const updatePost = (id, postData) => {
    return axios.patch(`/post/${id}`, postData);
}

export const deletePost = (id) => {
    return axios.delete(`/posts/${id}`);
}

export const likePost = (id) => {
    return axios.patch(`/posts/${id}/likePost`);
}

export const signIn = (formData) => {
    return API.post('/user/signin', formData);
}

export const signUp = (formData) => {
    return API.post('/user/signup', formData);
}