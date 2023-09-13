import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Typography from '@mui/material/Typography';

const UploadCV = ({ token }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      const formData = new FormData();
      formData.append('inputFile', file);

    //   try {
    //     setLoading(true);
    //     const response = await axios.post(
    //       'http://localhost:5000/upload',
    //       formData,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //           'Content-Type': 'multipart/form-data',
    //         },
    //       }
    //     );

    //     if (response.status === 200) {
    //       setUploadStatus('File uploaded successfully.');
    //     }
    //   } catch (error) {
    //     if (error.response) {
    //       setUploadStatus(`Error uploading file: ${error.response.data.message}`);
    //     } else {
    //       setUploadStatus('Error uploading file.');
    //     }
    //   } finally {
    //     setLoading(false);
    //   }
     }
  };

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
