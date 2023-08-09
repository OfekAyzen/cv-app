import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { Snackbar } from '@mui/material';
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
 
    randomId,
    randomArrayItem,
} from '@mui/x-data-grid-generator';

const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
    return randomArrayItem(roles);
};

const initialRows = [
 
];

function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;
    const [jobsData, setJobsData] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   
    // Fetch initial job data from the Flask backend
    useEffect(() => {
        const fetchJobsData = async () => {
            try {
                
                const response = await axios.get('http://localhost:5000/view_jobs', {
                    withCredentials: true,
                });
   
                const initialJobsData = response.data;
   
                const initialRowData = initialJobsData.map((job) => ({
                    id: job.job_id,
                    job_title: job.job_title,
                    job_description: job.job_description,
                    qualifications: job.qualifications,
                }));
   
                setRows(initialRowData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching jobs data:', error.message);
                setError(error.message);
                setLoading(false);
                // Handle error and show user feedback if needed
            }
        };
   
        fetchJobsData();
    }, []);
   
   

    const handleClick = () => {
        const id = randomId();
        setRows((oldRows) => [...oldRows, { id, job_title: '', job_description: '', qualifications: '', isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'job_title' },
        }));
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                Add record
            </Button>
        </GridToolbarContainer>
    );
}


export default function ViewJobsManger() {
    const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState({});
    const [notificationOpen, setNotificationOpen] = useState(false);

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };
    const handleSaveClick = (id) => async () => {
        try {
            const updatedRow = rows.find((row) => row.id === id);
    
            // Send the updatedRow to the backend
            await axios.post(`http://localhost:5000/edit_job/${id}`, updatedRow, {
                withCredentials: true,
            });
    
            // Update the local state with the updated job title
            const updatedRows = rows.map((row) => {
                console.log("row :",row)
                if (row.id === id) {
                    console.log("is matches :",row.job_title )
                    return { ...row, job_title: row.job_title };
                }
                return row;
            });
    
            // Update the state with the updated rows
            console.log("updated rows",updatedRows)
            console.log("row models :",rowModesModel)
            setRows(updatedRows);
    
            // Update the local state after successful update
            setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    
            // Show success notification
            setNotificationOpen(true);
        } catch (error) {
            console.error('Error updating job position:', error.message);
            // Handle error and show user feedback if needed
        }
    };
    
    const handleDeleteClick = (id) => async () => { //delete job 
        try {
            await axios.delete(`http://localhost:5000/delete_job/${id}`, {
                withCredentials: true,
            });
            setRows(rows.filter((row) => row.id !== id));
        } catch (error) {
            console.error('Error deleting job:', error.message);
            // Handle error and show user feedback if needed
        }
    };
    

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };


    const columns = [
        { field: 'job_title', headerName: 'Job Title', width: 80, editable: true },
        { field: 'job_description', headerName: 'Job description', width: 180, editable: true },
        { field: 'qualifications', headerName: 'Qualifications', width: 220, editable: true },

        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                        <GridActionsCellItem
                            icon={<DeleteIcon />}
                            label="Delete"
                            onClick={handleDeleteClick(id)} 
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                    
                ];
            },
        },
    ];

    return (
        <Box
            sx={{
                height: 500,
                width: '100%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
            }}
        >
             <Snackbar
                open={notificationOpen}
                autoHideDuration={3000} // Adjust duration as needed
                onClose={() => setNotificationOpen(false)}
                message="Job position updated successfully"
            />
            <DataGrid
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{
                    toolbar: EditToolbar,
                }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel },
                }}
            />
        </Box>
    );
}


///////////

