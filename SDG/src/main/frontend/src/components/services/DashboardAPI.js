import axios from 'axios';
const API_BASE_URL = "http://localhost:8080/api/dashboard";

class DashboardAPI {	
	
	coupon(userId) {
		return axios.post(`${API_BASE_URL}/coupon`, userId);
	}
}

const Dashboard = new DashboardAPI();
export default Dashboard;