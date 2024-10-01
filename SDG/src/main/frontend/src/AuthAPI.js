import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api/auth";

class AuthAPI {
    signup(user) {
        return axios.post(`${API_BASE_URL}/signup`, user);
    }

    login(credentials) {
        return axios.post(`${API_BASE_URL}/login`, credentials);
    }

    auth(accessToken) {
        return axios.post(`${API_BASE_URL}`, accessToken);
    }
}

export default new AuthAPI();