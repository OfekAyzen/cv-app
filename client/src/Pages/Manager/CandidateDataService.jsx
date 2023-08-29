import axios from "axios";

const API_URL = "http://localhost:5000";

class CandidateDataService {

  getAllPositions(token){
   
       
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      return axios.get(`${API_URL}/view_jobs`, { headers });
  }



  getCandidateAppliedStatus(token) {
       
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        return axios.get(`${API_URL}/candidate_applied_status`, { headers });
  }


  getAllCandidates(token) {
    return axios.get(`${API_URL}/view_all_candidates`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  updatePosition(positionId, positionName, jobDescription, qualifications, token) {
    console.log("the job id in edit :",positionId);
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const data = {
      job_title: positionName,
      job_description: jobDescription,
      qualifications: qualifications,
    };

    return axios.post(`${API_URL}/edit_job/${positionId}`, data, { headers });
  }
  
  deleteJob(positionId, token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios.delete(`${API_URL}/delete_job/${positionId}`, { headers });
  }

  addJob(data, token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return axios.post(`${API_URL}/add_job`, data, { headers });
  }


  addNote(applicationId, note, token) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const data = {
      application_id: applicationId,
      note: note,
    };

    return axios.post(`${API_URL}/add_note`, data, { headers });
  }
}

export default new CandidateDataService();
