import axios from 'axios';
const API_BASE_URL = `https://13.239.112.43/api/goal`;

class GoalAPI {	
	
	module(accessToken) {
		return axios.post(`${API_BASE_URL}/module`, accessToken);
	}

	goal(title, userId){
		return axios.get(`${API_BASE_URL}/${title}/${userId}`);
	}
}

const Goal = new GoalAPI();
export default Goal;