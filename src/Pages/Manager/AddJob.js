// import { useState } from 'react';
// import { API, graphqlOperation } from 'aws-amplify';
// import { createJob } from './graphql/mutations'; // Replace with the correct import path



// function AddJob() {
 
//   const [formData, setFormData] = useState({
//     job_description: '',
//     qualifications: '',
//     job_title: '',
//   });

//   async function addNewJob() {
//     try {
//       const { job_description, qualifications, job_title } = formData;
//       const newJob = await API.graphql(
//         graphqlOperation(createJob, {
//           input: {
//             job_description,
//             qualifications,
//             job_title,
//           },
//         })
//       );

//       console.log('New job created:', newJob);
//       // Reset the form or perform any other actions as needed
//     } catch (error) {
//       console.error('Error creating job:', error);
//     }
//   }

//   function handleChange(event) {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   }

//   return (
//     <div>
//     <h2>Add New Job</h2>
//     <form>
//       <div>
//         <label htmlFor="job_description">Job Description:</label>
//         <input
//           type="text"
//           id="job_description"
//           name="job_description"
//           value={formData.job_description}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="qualifications">Qualifications:</label>
//         <input
//           type="text"
//           id="qualifications"
//           name="qualifications"
//           value={formData.qualifications}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="job_title">Job Title:</label>
//         <input
//           type="text"
//           id="job_title"
//           name="job_title"
//           value={formData.job_title}
//           onChange={handleChange}
//         />
//       </div>
//       <button type="button" onClick={addNewJob}>
//         Add Job
//       </button>
//     </form>
//   </div>
//   );
// }

// export default AddJob;