
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Button, TextField, Grid, Typography, Box } from '@mui/material';

function NoteForm(props) {
  const [noteInput, setNoteInput] = useState('');
  const [notes, setNotes] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchNotes();
  }, [props.selectedJobId]);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/show_notes/${props.selectedJobId}`, {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      });
      setNotes(response.data.notes);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleAddNote = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/add_note',
        {
          job_id: props.selectedJobId,
          note: noteInput,
        },
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        }
      );

      setSuccessMessage(response.data.message);
      props.handleNoteAddSuccess(
        response.data.message,
        response.status === 200 ? 'green' : 'red',
        noteInput
      );

      setNotes([...notes, noteInput]);
      setNoteInput('');
    } catch (error) {
      console.error('Error adding note:', error);
      props.handleNoteAddError('Error adding note.', 'red');
    }
  };

  return (
    <Box>
      <Typography sx={{ display: 'flex',  textAlign: 'start', fontSize: '18px', color: "#469e62" }}>
        Existing Notes: {notes}
      </Typography>

      <Grid container alignItems="center" spacing={1}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Add Note"
            variant="outlined"
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
            sx={{ width: '300px',display:'flex',alignItems:'flex-start' }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{
              backgroundColor: "#ad2069",
              '&:hover': {
                backgroundColor: "#ff98b5", // Light pink color
              },
              display:'flex',
              alignItems:'flex-start',
             
            }}
            onClick={handleAddNote}
          >
            Add Note
          </Button>
          {successMessage && (
            <Typography sx={{ color: 'green', marginLeft: '8px' }}>
              {successMessage}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default NoteForm;