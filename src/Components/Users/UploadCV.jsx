import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Typography from '@mui/material/Typography';

import { Storage } from 'aws-amplify';


const UploadCV = ({ token }) => {
  const [uploadStatus, setUploadStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    console.log("handke file upload ");
    const file = e.target.files[0];

    if (file) {
      setLoading(true);

      const result = await uploadFile(file);

      if (result.success) {
        setUploadStatus('File uploaded successfully.');
      } else {
        setUploadStatus(`Error uploading file: ${result.error.message}`);
      }

      setLoading(false);
    }
  };

  async function uploadFile(file) {
    console.log("oploadfile");
  try {
    await Storage.put(file.name, file, {
      contentType: file.type, // Set the content type based on the file type
    });
    return { success: true };
  } catch (error) {
    console.error("Error uploading file: ", error);
    return { success: false, error };
  }
}
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10%' }}>
     
      <input
        type="file"
        accept=".pdf,.docx"
        onChange={handleFileChange}
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
