import axios from "axios";

const API_URL = "http://localhost:5000";

class CandidateDataService {
  getAllCandidates(token) {
    return axios.get(`${API_URL}/view_all_candidates`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new CandidateDataService();
