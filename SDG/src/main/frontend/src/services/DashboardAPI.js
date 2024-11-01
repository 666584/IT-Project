import axios from 'axios';
const API_BASE_URL = `https://localhost:443/api/dashboard`;

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