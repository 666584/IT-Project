import axios from 'axios';
const API_BASE_URL = `${process.env.REACT_APP_SERVER_URL}/api/auth`;

class AuthAPI {
    register(user) {
        return axios.post(`${API_BASE_URL}/signup`, user);
    }

    login(credentials) {
        return axios.post(`${API_BASE_URL}/login`, credentials);
    }

    auth(accessToken) {
        return axios.post(`${API_BASE_URL}`, accessToken);
    }

    googleLogin(accessToken) {
        return axios.post(`${API_BASE_URL}/googleLogin`, accessToken);
    }
}

const Auth = new AuthAPI();
export default Auth;