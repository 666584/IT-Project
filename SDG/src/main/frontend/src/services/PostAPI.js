import axios from 'axios';
const API_BASE_URL = `http://13.237.103.102:8080/api/post`;

class PostAPI {	
	
	create(postData) {
		return axios.post(`${API_BASE_URL}/create`, postData);
	}

    listByUser(userId) {
        return axios.get(`${API_BASE_URL}/list/${userId}`);
    }

    update(postData){
        return axios.post(`${API_BASE_URL}/update`, postData);
    }

    delete(postData){
        return axios.post(`${API_BASE_URL}/delete`, postData);
    }

    listByLike(){
        return axios.get(`${API_BASE_URL}/list`);
    }
}

const Post = new PostAPI();
export default Post;