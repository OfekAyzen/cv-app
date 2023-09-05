
import React from "react";
import {
    Dialog,
    DialogContent,
    Button,
    Card,
    CardContent,
    Typography,
    Divider,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import WcOutlinedIcon from "@mui/icons-material/WcOutlined";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
import NoteForm from "./NoteForm";
import StatusChangeForm from "./StatusChangeForm";
import DownloadCV from "./DownloadCV";

const CandidateDialog = ({
    open,
    handleClose,
    selectedCandidate,
    selectedJobId,
    statusChangeMessage,
    statusChangeMessageColor,
    handleStatusChangeSuccess,
    handleStatusChangeError,
    handleNoteAddSuccess,
    handleNoteAddError,
    handleDeleteApplication,
    token,
}) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            style={{
                width: "50%", 
                maxWidth: "none", 
                position: "fixed", 
                right: 1, 
                top: 0, 
                height: "100%", 
                borderRadius: 0, 
            }}
            maxWidth="xl"
            fullWidth
        >
            <Button
                color="primary"
                onClick={handleClose}
                style={{ marginTop: "16px", height: "30px", width: "10px", position: "fixed" ,color:'black'}}
            >
                X
            </Button>

            <DialogContent className="profilePopUp">
                {selectedCandidate ? (
                    <Card className="candidate-card-profile" style={{ height: "100%" }}>
                        <CardContent
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                height: "100%",
                                padding: "16px",
                                alignContent: "flex-start",
                            }}
                        >
                            <Typography variant="h4" sx={{ paddingTop: "15px", fontSize: "40px" }}>
                                {selectedCandidate.first_name}  {selectedCandidate.last_name} cv
                            </Typography>
                            <Typography sx={{ paddingTop: "35px", fontSize: "18px" }}>
                                <MailOutlineIcon fontSize="small" /> Email: {selectedCandidate.email}
                            </Typography>
                            <Typography sx={{ paddingTop: "5px", fontSize: "18px" }}>
                                <LocalPhoneOutlinedIcon fontSize="small" /> Phone: {selectedCandidate.phone_number}
                            </Typography>
                            <Typography sx={{ paddingTop: "5px", fontSize: "18px" }}>
                                <AddLocationAltOutlinedIcon fontSize="small" /> Location: {selectedCandidate.location}
                            </Typography>
                            <Typography sx={{ paddingTop: "5px", fontSize: "18px" }}>
                                <WcOutlinedIcon fontSize="small" /> Gender: {selectedCandidate.gender}
                            </Typography>
                            <hr />
                            <Typography sx={{ paddingTop: "5px", fontSize: "18px" }}>
                                Position: {selectedCandidate.position}
                            </Typography>
                            <Typography sx={{ paddingTop: "5px", fontSize: "18px" }}>
                                Education: {selectedCandidate.education}
                            </Typography>
                            <Typography sx={{ paddingTop: "5px", fontSize: "18px" }}>
                                Experience: {selectedCandidate.work_experience}
                            </Typography>
                            <Typography sx={{ paddingTop: "5px", fontSize: "18px" }}>
                                Skills: {selectedCandidate.skills}
                            </Typography>
                            <Typography sx={{ paddingTop: "5px", fontSize: "18px" }}>
                                Certification: {selectedCandidate.certifications}
                            </Typography>
                            <Typography sx={{ paddingTop: "5px", fontSize: "18px" }}>
                                Department: {selectedCandidate.position}
                            </Typography>
                            <div style={{ display: "flex", alignItems: "center", marginTop: "16px" }}>
                                <NoteForm
                                    selectedJobId={selectedJobId}
                                    token={token}
                                    handleNoteAddSuccess={handleNoteAddSuccess}
                                    handleNoteAddError={handleNoteAddError}
                                />
                            </div>

                            <div style={{ display: "flex", alignItems: "center", marginTop: "16px" }}>
                                <StatusChangeForm
                                    token={token}
                                    selectedJobId={selectedJobId}
                                    handleStatusChangeSuccess={handleStatusChangeSuccess}
                                    handleStatusChangeError={handleStatusChangeError}
                                    currentStatus={
                                        selectedCandidate.appliedJobs.find((job) => job.job_id === selectedJobId)?.status || ""
                                    }
                                    selectedCandidate={selectedCandidate} // Pass the selected candidate here
                                />
                                <Typography style={{ color: statusChangeMessageColor, marginLeft: "16px" }}>
                                    {statusChangeMessage}
                                </Typography>
                            </div>

                            <Divider style={{ margin: "16px 0", color: "grey" }} />
                            <DownloadCV token={token} setToken={token} candidate_id={selectedCandidate.candidate_id} />
                        </CardContent>
                    </Card>
                ) : (
                    <h1>No candidate data found</h1>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default CandidateDialog;