import axios from 'axios';
const API_BASE_URL = "http://localhost:8080/api/post";

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

    listByLike(){
        return axios.get(`${API_BASE_URL}/list`);
    }
}

const Post = new PostAPI();
export default Post;