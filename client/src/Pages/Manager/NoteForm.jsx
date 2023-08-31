// import React, { useState ,useEffect } from 'react';
// import axios from 'axios';

// import { Button, TextField, Grid, Typography } from '@mui/material';
// function NoteForm(props) {
//   const [noteInput, setNoteInput] = useState('');
//   const [notes, setNotes] = useState([]);

//   const fetchNotes = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/show_notes/${props.selectedJobId}`, {
//         headers: {
//           Authorization: `Bearer ${props.token}`,
//         },
//       });
//       setNotes(response.data.notes);
//     } catch (error) {
//       console.error('Error fetching notes:', error);
//     }
//   };

//   const handleAddNote = async () => {
//     try {
//       const response = await axios.post(
//         'http://localhost:5000/add_note',
//         {
//           job_id: props.selectedJobId,
//           note: noteInput,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${props.token}`,
//           },
//         }
//       );

//       // Handle success logic here
//       props.handleNoteAddSuccess(
//         response.data.message,
//         response.status === 200 ? 'green' : 'red',
//         noteInput
//       );

//       // Fetch the updated notes after adding a note
//       fetchNotes();

//       setNoteInput('');
//     } catch (error) {
//       // Handle error logic here
//       console.error('Error adding note:', error);
//       props.handleNoteAddError('Error adding note.', 'red');
//     }
//   };

//   const handleNoteAddSuccess = (message, color, note) => {
//     // Update the state or perform any other necessary actions
//     console.log(message, color, note);
//   };
//   return (
//     <Grid container alignItems="center" spacing={1}>
//       <Grid item>
//         <TextField
//           label="Add Note"
//           variant="outlined"
//           value={noteInput}
//           onChange={(e) => setNoteInput(e.target.value)}
//         />
//       </Grid>
//       <Grid item>
//         <Button variant="contained" color="primary" onClick={handleAddNote}>
//           Add Note
//         </Button>
//       </Grid>
//       <Grid item>
//         {successMessage && (
//           <span style={{ color: 'green', marginLeft: '8px' }}>
//             {successMessage}
//           </span>
//         )}
//       </Grid>
//       <Grid item>
//       <div>
//         <Typography variant="h6">Existing Notes:</Typography>
//         <ul>
//           {notes.map((note, index) => (
//             <li key={index}>{note}</li>
//           ))}
//         </ul>
//       </div>
//       </Grid>
//     </Grid>
//   );
// }

// export default NoteForm;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// import { Button, TextField, Grid, Typography } from '@mui/material';

// function NoteForm(props) {
//     const [noteInput, setNoteInput] = useState('');
//     const [notes, setNotes] = useState([]);
//     const [successMessage, setSuccessMessage] = useState('');
//   useEffect(() => {
//     fetchNotes();
//   }, [props.selectedJobId]); // Fetch notes whenever selectedJobId changes

//   const fetchNotes = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/show_notes/${props.selectedJobId}`, {
//         headers: {
//           Authorization: `Bearer ${props.token}`,
//         },
//       });
//       setNotes(response.data.notes);
//     } catch (error) {
//       console.error('Error fetching notes:', error);
//     }
//   };

//   const handleAddNote = async () => {
//     try {
//       const response = await axios.post(
//         'http://localhost:5000/add_note',
//         {
//           job_id: props.selectedJobId,
//           note: noteInput,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${props.token}`,
//           },
//         }
//       );

//       // Handle success logic here
//       setSuccessMessage(response.data.message); // Set success message
//       props.handleNoteAddSuccess(
//         response.data.message,
//         response.status === 200 ? 'green' : 'red',
//         noteInput
//       );

//       // Fetch the updated notes after adding a note
//       fetchNotes();
//       setNotes([ noteInput]);

//       setNoteInput('');
//     } catch (error) {
//       // Handle error logic here
//       console.error('Error adding note:', error);
//       props.handleNoteAddError('Error adding note.', 'red');
//     }
//   };

//   return (
//     <Grid container alignItems="center" spacing={1}>
//       <Grid item>
//         <TextField
//           label="Add Note"
//           variant="outlined"
//           value={noteInput}
//           onChange={(e) => setNoteInput(e.target.value)}
//         />
//       </Grid>
//       <Grid item>
//         <Button variant="contained" color="primary" onClick={handleAddNote}>
//           Add Note
//         </Button>
//       </Grid>
//       <Grid item>
//         {successMessage && (
//           <span style={{ color: 'green', marginLeft: '8px' }}>
//             {successMessage}
//           </span>
//         )}
//       </Grid>
//       <Grid item>
//         <div>
//           <Typography variant="h6">Existing Notes:</Typography>
//           <ul>
//             {notes}
            
//           </ul>
//         </div>
//       </Grid>
//     </Grid>
//   );
// }

// export default NoteForm;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// import { Button, TextField, Grid, Typography } from '@mui/material';

// function NoteForm(props) {
//   const [noteInput, setNoteInput] = useState('');
//   const [notes, setNotes] = useState([]);
//   const [successMessage, setSuccessMessage] = useState('');

//   useEffect(() => {
//     fetchNotes();
//   }, [props.selectedJobId]);

//   const fetchNotes = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/show_notes/${props.selectedJobId}`, {
//         headers: {
//           Authorization: `Bearer ${props.token}`,
//         },
//       });
//       setNotes(response.data.notes);
//     } catch (error) {
//       console.error('Error fetching notes:', error);
//     }
//   };

//   const handleAddNote = async () => {
//     try {
//       const response = await axios.post(
//         'http://localhost:5000/add_note',
//         {
//           job_id: props.selectedJobId,
//           note: noteInput,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${props.token}`,
//           },
//         }
//       );

//       // Handle success logic here
//       setSuccessMessage(response.data.message);
//       props.handleNoteAddSuccess(
//         response.data.message,
//         response.status === 200 ? 'green' : 'red',
//         noteInput
//       );

//       // Fetch the updated notes after adding a note
//       //fetchNotes();

//       // Add the newly added note to the top of the list
//       setNotes([noteInput]);

//       setNoteInput('');
//     } catch (error) {
//       console.error('Error adding note:', error);
//       props.handleNoteAddError('Error adding note.', 'red');
//     }
//   };

//   return (
//     <>
      
   
       

      
//     <Grid container alignItems="center" spacing={1}>
//     <Typography variant="h6">  Existing Notes:  {notes}</Typography>
//       <Grid item>
//         <TextField
//           label="Add Note"
//           variant="outlined"
//           value={noteInput}
//           onChange={(e) => setNoteInput(e.target.value)}
//         />
//       </Grid>
   
//       <Grid item>
        
//         <Button variant="contained" color="primary" onClick={handleAddNote}>
//           Add Note
//         </Button>
//       </Grid>
//       <Grid item>
//         {successMessage && (
//           <span style={{ color: 'green', marginLeft: '8px' }}>
//             {successMessage}
//           </span>
//         )}
//       </Grid>
     
//     </Grid>
//     </>
    
//   );
// }

// export default NoteForm;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Button, TextField, Grid, Typography } from '@mui/material';

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

      // Handle success logic here
      setSuccessMessage(response.data.message);
      props.handleNoteAddSuccess(
        response.data.message,
        response.status === 200 ? 'green' : 'red',
        noteInput
      );

      // Fetch the updated notes after adding a note
      //fetchNotes();

      // Add the newly added note to the top of the list
      setNotes([noteInput]);

      setNoteInput('');
    } catch (error) {
      console.error('Error adding note:', error);
      props.handleNoteAddError('Error adding note.', 'red');
    }
  };

  return (
    <div>
      <Typography  sx={{display:'flex',textAlign:'start' ,fontSize:'18px' ,color:" #469e62"}}>Existing Notes: {notes}</Typography>
      
        
      
      <Grid container alignItems="center" spacing={1}>
        <Grid item>
          <TextField
            label="Add Note"
            variant="outlined"
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" size="small" sx={{backgroundColor: "#ad2069",'&:hover': {
                backgroundColor: "#ff98b5", // Light pink color
              },}} onClick={handleAddNote}>
            Add Note
          </Button>
        </Grid>
        <Grid item>
          {successMessage && (
            <span style={{ color: 'green', marginLeft: '8px' }}>
              {successMessage}
            </span>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default NoteForm;