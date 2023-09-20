

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Typography from '@mui/material/Typography';
import { Storage, API, graphqlOperation } from 'aws-amplify';
// Import your GraphQL mutation (update this import as needed)
import { updateCandidate } from '../../graphql/mutations';

const UploadCV = ({ candidateId }) => {
  const [uploadStatus, setUploadStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async (event) => {
    const cvFile = event.target.files[0];

    if (cvFile) {
      setLoading(true);

      try {
        const cvResponse = await Storage.put(cvFile.name, cvFile, {
          contentType: cvFile.type,
        });

        if (cvResponse) {
          const cvKey = cvResponse.key;

          // Update the candidate's CV field using the updateCandidate mutation
          await updateCandidateCV(candidateId, cvKey);

          // Handle the rest of your UI logic here
          setUploadStatus('File uploaded successfully.');
        } else {
          setUploadStatus('Error uploading file.');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        setUploadStatus(`Error uploading file: ${error.message}`);
      }

      setLoading(false);
    }
  };

  async function updateCandidateCV(candidateId, cvKey) {
    try {
      // Call the updateCandidate mutation using Amplify API
      const result = await API.graphql(
        graphqlOperation(updateCandidate, {
          input: {
            id: candidateId,
            cv: cvKey, // Update the cv field with the new CV key
          },
        })
      );

      // Handle the response as needed
      // For example, you can check if the update was successful
      if (result.data.updateCandidate) {
        // CV update was successful
      } else {
        // CV update failed
      }
    } catch (error) {
      console.error('Error updating candidate CV:', error);
      // Handle the error as needed
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10%' }}>
      <input
        type="file"
        accept=".pdf,.docx" // Specify the accepted file formats
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
