import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api/goal";

class GoalAPI {	
	
	module(accessToken) {
		return axios.post(`${API_BASE_URL}/module`, accessToken);
	}
}

export default new GoalAPI();