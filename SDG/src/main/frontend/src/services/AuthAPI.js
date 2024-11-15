import axios from 'axios';
const API_BASE_URL = `http://13.237.103.102:8080/api/auth`;

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

    userInfo(userId){
        return axios.get(`${API_BASE_URL}/user/${userId}`);
    }
    
    update(userData){
        return axios.post(`${API_BASE_URL}/user/update`, userData);
    }
}

const Auth = new AuthAPI();
export default Auth;