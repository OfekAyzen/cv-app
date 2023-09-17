// import React, { useState } from 'react';
// import axios from 'axios';
// import Button from '@mui/material/Button';
// import CircularProgress from '@mui/material/CircularProgress';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import Typography from '@mui/material/Typography';

// import { Storage } from 'aws-amplify';


// const UploadCV = ({ token }) => {
//   const [uploadStatus, setUploadStatus] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = async (e) => {
//     console.log("handke file upload ");
//     const file = e.target.files[0];

//     if (file) {
//       setLoading(true);

//       const result = await uploadFile(file);

//       if (result.success) {
//         setUploadStatus('File uploaded successfully.');
//       } else {
//         setUploadStatus(`Error uploading file: ${result.error.message}`);
//       }

//       setLoading(false);
//     }
//   };

//   async function uploadFile(file) {
//     console.log("uploadfile");
//   try {
//     await Storage.put(file.name, file, {
//       contentType: file.type, // Set the content type based on the file type
//     });
//     return { success: true };
//   } catch (error) {
//     console.error("Error uploading file: ", error);
//     return { success: false, error };
//   }
// }
//   return (
//     <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10%' }}>
     
//       <input
//         type="file"
//         accept=".pdf,.docx"
//         onChange={handleFileChange}
//         style={{ display: 'none' }}
//         id="file-upload-input"
//       />
//       <label htmlFor="file-upload-input">
//         <Button
//           variant="outlined"
//           component="span"
//           sx={{
//             color: "#ad2069",
//             width: '90%',
//             height: "50px",
//             borderBlockColor: "#ad2069",
//             '&:hover': {
//               borderColor: "#b4269a",
//               boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
//             }
//           }}
//           startIcon={<CloudUploadIcon />}
//         >
//           Choose CV
//         </Button>
//       </label>
//       {loading && <CircularProgress size={24} />}
//       <Typography
//         variant="body1"
//         style={{
//           color: uploadStatus.includes('successfully') ? 'green' : 'red',
//         }}
//       >
//         {uploadStatus}
//       </Typography>
//     </div>
//   );
// };
// // 
// export default UploadCV;

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Typography from '@mui/material/Typography';

import { Storage, API, graphqlOperation } from 'aws-amplify';

// Import your GraphQL mutation (update this import as needed)


const UploadCV = ({ candidateId }) => {
  const [uploadStatus, setUploadStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const handleUpload = async (event) => {

    console.log("at upload !");
    const cvFile = event.target.files[0];

    if (cvFile) {
      setLoading(true);

      try {
        const cvResponse = await Storage.put(cvFile.name, cvFile, {
          contentType: cvFile.type,
        });

        if (cvResponse) {
          const cvKey = cvResponse.key;

          // Add CV to candidate
          await calladdCVToCandidate(candidateId, cvKey);

          // Call the createCandidateAndApply function from props
          props.createCandidateAndApply(); // Call the function from props

          // Handle the rest of your UI logic here
        } else {
          // Handle the error
        }
      } catch (error) {
        // Handle the error
      }

      setLoading(false);
    }
  };
  // const handleFileChange = async (e) => {
  //   console.log("candidateId is d :",candidateId);
  //   const file = e.target.files[0];

  //   if (file) {
  //     setLoading(true);

  //     try {
  //       // Upload the file to Amazon S3 using Amplify Storage
  //       const response = await Storage.put(file.name, file, {
  //         contentType: file.type,
  //       });

  //       // If the upload is successful, call the addCVToCandidate mutation
  //       if (response) {
  //         const cvKey = response.key;
  //         await calladdCVToCandidate(candidateId, cvKey);
  //         setUploadStatus('File uploaded successfully.');
  //       } else {
  //         setUploadStatus('Error uploading file.');
  //       }
  //     } catch (error) {
  //       console.error('Error uploading file:', error);
  //       setUploadStatus(`Error uploading file: ${error.message}`);
  //     }

  //     setLoading(false);
  //   }
  // };

  async function calladdCVToCandidate(candidateId, cvKey) {
    try {
      // Call the addCVToCandidate mutation using Amplify API
      const result = await API.graphql(
        graphqlOperation(addCVToCandidate, {
          input: {
            candidateId: candidateId,
            cvKey: cvKey,
          },
        })
      );

      // Handle the response as needed
      // For example, you can access the updated candidate data from result.data.createCVCandidate
    } catch (error) {
      console.error('Error adding CV to candidate:', error);
      // Handle the error as needed
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10%' }}>
      <input
        type="file"
        accept=".pdf,.docx"
        onChange={handleUpload} 
        style={{ display: 'none' }}
        id="file-upload-input"
      />
      <label htmlFor="file-upload-input">
        <Button
          variant="outlined"
          
          component="span"
          sx={{
            color: "#ad2069",
            width: '90%',
            height: "50px",
            borderBlockColor: "#ad2069",
            '&:hover': {
              borderColor: "#b4269a",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            }
          }}
          startIcon={<CloudUploadIcon />}
        >
          Choose CV
        </Button>
      </label>
      {loading && <CircularProgress size={24} />}
      <Typography
        variant="body1"
        style={{
          color: uploadStatus.includes('successfully') ? 'green' : 'red',
        }}
      >
        {uploadStatus}
      </Typography>
    </div>
  );
};

export default UploadCV;
