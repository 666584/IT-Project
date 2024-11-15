import axios from 'axios';
const API_BASE_URL = `http://13.237.103.102:8080/api/dashboard`;

class DashboardAPI {	
	
	coupon(userId) {
		return axios.post(`${API_BASE_URL}/coupon`, userId);
	}

	userData(userId){
		return axios.get(`${API_BASE_URL}/${userId}`);
	}
}

const Dashboard = new DashboardAPI();
export default Dashboard;