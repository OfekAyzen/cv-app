import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Pages/Manager/LandingPage.css';
import Header from '../../Components/Header';
import { DataGrid } from '@mui/x-data-grid';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import {

    GridToolbarContainer,

    GridToolbarFilterButton,
    GridToolbarExport,

} from '@mui/x-data-grid';

import Apply from './Apply';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import EditPostion from "../../Pages/Manager/EditPosition";
const VISIBLE_FIELDS = ['job_title', 'job_description', 'qualifications', 'apply'];
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const ViewJobs = ({ userRole }) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [jobsData, setJobsData] = useState('');
    const [selectedJobId, setSelectedJobId] = useState(null); // State to store the selected job_id
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    const fetchJobsData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/view_jobs', {
                withCredentials: true,
            });
            const dataWithIds = response.data.map((job) => ({
                ...job,
                id: job.job_id, // Use the existing job_id as the id
            }));

            setJobsData(dataWithIds);

            setError(null); // Clear any previous error
        } catch (error) {
            console.log('Error fetching positions:', error.message, 'user role =', userRole);
            setError('Error fetching positions');
        } finally {
            setLoading(false); // Set loading to false regardless of success or error
        }
    };

    useEffect(() => {
        if (userRole === 'candidate') {
            fetchJobsData();
        }
        if (userRole === 'manager') {
            fetchJobsData();
        }
        else {
            setError('You are not authorized to view jobs data.');
            setLoading(false);
        }
    }, [userRole]);

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarFilterButton />
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const getRowClassName = (params) => {
        return 'rounded-row';
    };

    const handleApplyButtonClick = (jobId) => {
        // Implement your logic here to handle the apply button click
        // You can navigate to the Apply component or show a modal, etc.
        console.log(`User clicked apply for job with ID ${jobId}`);
        setOpen(true);
        setSelectedJobId(jobId); // Store the selected job_id in state
    };

    const columns = VISIBLE_FIELDS.map((field) => ({
        field,
        headerName:
            field === 'job_title'
                ? 'Job'
                : field === 'job_description'
                    ? 'Description'
                    : field === 'qualifications'
                        ? 'Qualifications'
                        : field === 'Apply'
                            ? ' '
                            : field,

        width: 200,
        renderCell: (params) => {
            if (field === 'apply') {

                return (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleApplyButtonClick(params.row.id)}
                    >
                        Apply
                    </Button>
                );
            } else {
                return params.value;
            }
        },
    }));
    const columns2 = VISIBLE_FIELDS.map((field) => ({
        field,
        headerName:
            field === 'job_title'
                ? 'Job'
                : field === 'job_description'
                    ? 'Description'
                    : field === 'qualifications'
                        ? 'Qualifications'
                        : field === 'Apply'
                            ? ' '
                            : field,

        width: 200,
        renderCell: (params) => {
            if (field === 'apply') {

                return (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleApplyButtonClick(params.row.id)}
                    >
                        EDIT
                    </Button>
                );
            } else {
                return params.value;
            }
        },
    }));

    return (
        <>
            <Header />
            <CssBaseline />

            <Container fixed>

                {jobsData.length > 0 ? (
                    <div className="data-grid-container">
                        <DataGrid
                            slots={{ toolbar: CustomToolbar }}
                            getRowClassName={getRowClassName}
                            rows={jobsData}
                            columns={columns}
                        />
                    </div>
                ) : (
                    <p>No job data available.</p>
                )}
            </Container>

            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <Header>

                </Header>
                <AppBar sx={{ position: 'relative', backgroundColor: 'black' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Close
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Save
                        </Button>
                    </Toolbar>
                </AppBar>
                {selectedJobId && <Apply job_id={selectedJobId} />}{/* Render the Apply component if selectedJobId is truthy */}
            </Dialog>


        </>
    );
};

export default ViewJobs;
