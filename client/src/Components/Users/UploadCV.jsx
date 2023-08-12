import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
const UploadCV = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('inputFile', selectedFile);

    try {
      const response = await axios.post(
        'http://localhost:5000/upload',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        setUploadStatus('File uploaded successfully.');
      }
    } catch (error) {
      if (error.response) {
        setUploadStatus(`Error uploading file: ${error.response.data.message}`);
      } else {
        setUploadStatus('Error uploading file.');
      }
    }
  };

  return (
    <div>
      <input type="file" accept=".pdf,.docx" onChange={handleFileChange} />
      
      <Button onClick={handleUpload} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                           Upload CV
                        </Button>
      <p>{uploadStatus}</p>
    </div>
  );
};

export default UploadCV;