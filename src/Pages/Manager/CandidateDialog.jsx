
// import React from "react";
// import {
//     Dialog,
//     DialogContent,
//     Button,
//     Card,
//     CardContent,
//     Typography,
//     Divider,
// } from "@mui/material";
// import MailOutlineIcon from "@mui/icons-material/MailOutline";
// import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
// import WcOutlinedIcon from "@mui/icons-material/WcOutlined";
// import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
// import NoteForm from "./NoteForm";
// import StatusChangeForm from "./StatusChangeForm";
// import DownloadCV from "./DownloadCV";

// const CandidateDialog = ({
//     open,
//     handleClose,
//     selectedCandidate,
//     selectedJobId,
//     statusChangeMessage,
//     statusChangeMessageColor,
//     handleStatusChangeSuccess,
//     handleStatusChangeError,
//     handleNoteAddSuccess,
//     handleNoteAddError,
//     handleDeleteApplication,
//     token,
// }) => {
//     return (
//         <Dialog
//             open={open}
//             onClose={handleClose}
//             style={{
//                 width: "50%", 
//                 maxWidth: "none", 
//                 position: "fixed", 
//                 right: 1, 
//                 top: 0, 
//                 height: "100%", 
//                 borderRadius: 0, 
//             }}
//             maxWidth="xl"
//             fullWidth
//         >
//             <Button
//                 color="primary"
//                 onClick={handleClose}
//                 style={{ marginTop: "16px", height: "30px", width: "10px", position: "fixed" ,color:'black'}}
//             >
//                 X
//             </Button>

//             <DialogContent className="profilePopUp">
//                 {selectedCandidate ? (
//                     <Card className="candidate-card-profile" style={{ height: "100%" }}>
//                         <CardContent
//                             style={{
//                                 display: "flex",
//                                 flexDirection: "column",
//                                 alignItems: "flex-start",
//                                 height: "100%",
//                                 padding: "16px",
//                                 alignContent: "flex-start",
//                             }}
//                         >
//                             <Typography variant="h4" sx={{ paddingTop: "15px", fontSize: "40px" }}>
//                                 {selectedCandidate.first_name}  {selectedCandidate.last_name} cv
//                             </Typography>
//                             <Typography sx={{ paddingTop: "35px", fontSize: "18px" }}>
//                                 <MailOutlineIcon fontSize="small" /> Email: {selectedCandidate.email}
//                             </Typography>
//                             <Typography sx={{ paddingTop: "5px", fontSize: "18px" }}>
//                                 <LocalPhoneOutlinedIcon fontSize="small" /> Phone: {selectedCandidate.phone_number}
//                             </Typography>
//                             <Typography sx={{ paddingTop: "5px", fontSize: "18px" }}>
//                                 <AddLocationAltOutlinedIcon fontSize="small" /> Location: {selectedCandidate.location}
//                             </Typography>
//                             <Typography sx={{ paddingTop: "5px", fontSize: "18px" }}>
//                                 <WcOutlinedIcon fontSize="small" /> Gender: {selectedCandidate.gender}
//                             </Typography>
//                             <hr />
//                             <Typography sx={{ paddingTop: "5px", fontSize: "18px" }}>
//                                 Position: {selectedCandidate.position}
//                             </Typography>
//                             <Typography sx={{ paddingTop: "5px", fontSize: "18px" }}>
//                                 Education: {selectedCandidate.education}
//                             </Typography>
//                             <Typography sx={{ paddingTop: "5px", fontSize: "18px" }}>
//                                 Experience: {selectedCandidate.work_experience}
//                             </Typography>
//                             <Typography sx={{ paddingTop: "5px", fontSize: "18px" }}>
//                                 Skills: {selectedCandidate.skills}
//                             </Typography>
//                             <Typography sx={{ paddingTop: "5px", fontSize: "18px" }}>
//                                 Certification: {selectedCandidate.certifications}
//                             </Typography>
//                             <Typography sx={{ paddingTop: "5px", fontSize: "18px" }}>
//                                 Department: {selectedCandidate.position}
//                             </Typography>
//                             <div style={{ display: "flex", alignItems: "center", marginTop: "16px" }}>
//                                 <NoteForm
//                                     selectedJobId={selectedJobId}
//                                     token={token}
//                                     handleNoteAddSuccess={handleNoteAddSuccess}
//                                     handleNoteAddError={handleNoteAddError}
//                                 />
//                             </div>

//                             <div style={{ display: "flex", alignItems: "center", marginTop: "16px" }}>
//                                 <StatusChangeForm
//                                     token={token}
//                                     selectedJobId={selectedJobId}
//                                     handleStatusChangeSuccess={handleStatusChangeSuccess}
//                                     handleStatusChangeError={handleStatusChangeError}
//                                     currentStatus={
//                                         selectedCandidate.appliedJobs.find((job) => job.job_id === selectedJobId)?.status || ""
//                                     }
//                                     selectedCandidate={selectedCandidate} // Pass the selected candidate here
//                                 />
//                                 <Typography style={{ color: statusChangeMessageColor, marginLeft: "16px" }}>
//                                     {statusChangeMessage}
//                                 </Typography>
//                             </div>

//                             <Divider style={{ margin: "16px 0", color: "grey" }} />
//                             <DownloadCV token={token} setToken={token} candidate_id={selectedCandidate.candidate_id} />
//                         </CardContent>
//                     </Card>
//                 ) : (
//                     <h1>No candidate data found</h1>
//                 )}
//             </DialogContent>
//         </Dialog>
//     );
// };

// export default CandidateDialog;


// import React,{ useState } from "react";
// import {
//     Dialog,
//     DialogContent,
//     Button,
//     Card,
//     CardContent,
//     Typography,
//     Divider,
//     FormControl,InputLabel, Select,MenuItem,
// } from "@mui/material";
// import MailOutlineIcon from "@mui/icons-material/MailOutline";
// import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
// import WcOutlinedIcon from "@mui/icons-material/WcOutlined";
// import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
// import NoteForm from "./NoteForm";
// import StatusChangeForm from "./StatusChangeForm";
// import DownloadCV from "./DownloadCV";
// import { API, graphqlOperation } from "aws-amplify"; // Import AWS Amplify
// import { updateCandidate } from "../../graphql/mutations";

// const CandidateDialog = ({
//     open,
//     handleClose,
//     selectedCandidate,
//     selectedJobId,
//     statusChangeMessage,
//     statusChangeMessageColor,
    
//     handleNoteAddSuccess,
//     handleNoteAddError,
//     handleDeleteApplication,
// }) => {

//     const [newStatus, setNewStatus] = useState(
//         // selectedCandidate?.appliedJobs.find((job) => job.job_id === selectedJobId)
//         //   ?.status || ""
//       );
    
//     //   // Function to handle the status change
//       const handleStatusChange = async () => {
//         console.log("selectedCandidate.id   : ",selectedCandidate.id );
//         console.log("status : ",newStatus);
//         try {
//           // Define the input for the updateCandidate mutation
//           const input = {
//             id: selectedCandidate.id,
//             status: newStatus,
//           };
    
//           // Send the mutation request
//           const response = await API.graphql(
//             graphqlOperation(updateCandidate, { input })
//           );
    
//           // Handle success
//           console.log("Candidate status updated:", response.data.updateCandidate);
    
//           // Update your local state or perform any other actions as needed
//         //   handleStatusChangeSuccess("Status updated successfully", "green", newStatus);
//         } catch (error) {
//           // Handle error
//           console.error("Error updating status:", error);
//         //   handleStatusChangeError("Error updating status.", "red");
//         }
//       };
// {console.log(" DIALOG : ", selectedCandidate, "selectedJobId ",
// selectedJobId
// )}


//     return (
//         <Dialog
//             open={open}
//             onClose={handleClose}
//             style={{
//                 width: "50%", 
//                 maxWidth: "none", 
//                 position: "fixed", 
//                 right: 1, 
//                 top: 0, 
//                 height: "100%", 
//                 borderRadius: 0, 
//             }}
//             maxWidth="xl"
//             fullWidth
//         >
//             <Button
//                 color="primary"
//                 onClick={handleClose}
//                 style={{ marginTop: "16px", height: "30px", width: "10px", position: "fixed" ,color:'black'}}
//             >
//                 X
//             </Button>


//             <DialogContent className="profilePopUp">
//                 {selectedCandidate ? (
//                     <Card className="candidate-card-profile" style={{ height: "100%" }}>
                                   
//                         <CardContent
//                             style={{
//                                 display: "flex",
//                                 flexDirection: "column",
//                                 alignItems: "flex-start",
//                                 height: "100%",
//                                 padding: "16px",
//                                 alignContent: "flex-start",
//                             }}
//                         >
//                             <Typography variant="h4" sx={{ paddingTop: "15px", fontSize: "40px" }}>
//                                 {selectedCandidate.first_name}  {selectedCandidate.last_name} cv
//                             </Typography>
//                             <Typography sx={{ paddingTop: "35px", fontSize: "18px" }}>
//                                 <MailOutlineIcon fontSize="small" /> Email: {selectedCandidate.email}
//                             </Typography>
                            // <Typography sx={{ paddingTop: "5px", fontSize: "18px" }}>
                            //     <LocalPhoneOutlinedIcon fontSize="small" /> Phone: {selectedCandidate.phone_number}
                            // </Typography>
                            // <Typography sx={{ paddingTop: "5px", fontSize: "18px" }}>
                            //     <AddLocationAltOutlinedIcon fontSize="small" /> Location: {selectedCandidate.location}
                            // </Typography>
                            // <Typography sx={{ paddingTop: "5px", fontSize: "18px" }}>
                            //     <WcOutlinedIcon fontSize="small" /> Gender: {selectedCandidate.gender}
                            // </Typography>
                            // <hr />
                            // <Typography sx={{ paddingTop: "5px", fontSize: "18px" }}>
                            //     Position: {selectedCandidate.position}
                            // </Typography>
                            // <Typography sx={{ paddingTop: "5px", fontSize: "18px" }}>
                            //     Education: {selectedCandidate.education}
                            // </Typography>
                            // <Typography sx={{ paddingTop: "5px", fontSize: "18px" }}>
                            //     Experience: {selectedCandidate.work_experience}
                            // </Typography>
                            // <Typography sx={{ paddingTop: "5px", fontSize: "18px" }}>
                            //     Skills: {selectedCandidate.skills}
                            // </Typography>
                            // <Typography sx={{ paddingTop: "5px", fontSize: "18px" }}>
                            //     Certification: {selectedCandidate.certifications}
                            // </Typography>
                            // <Typography sx={{ paddingTop: "5px", fontSize: "18px" }}>
                            //     Department: {selectedCandidate.position}
                            // </Typography>
//                         {/* Status Change Form */}
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   marginTop: "16px",
//                 }}
//               >
//                 <FormControl variant="outlined" sx={{ width: "300px" }}>
//                   <InputLabel>Status</InputLabel>
//                   <Select
//                     value={newStatus || ""}
//                     onChange={(e) => setNewStatus(e.target.value)}
//                     label="Status"
//                   >
                //    <MenuItem value={"Accepted"}>Accepted</MenuItem>
                //     <MenuItem value={"Pending"}>Pending</MenuItem>
                //     <MenuItem value={"Application Received"}>Application Received</MenuItem>
                //     <MenuItem value={"Application Under Review"}>Application Under Review</MenuItem>
                //     <MenuItem value={"Interview Scheduled"}>Interview Scheduled</MenuItem>
                //     <MenuItem value={"Assessment/Testing"}>Assessment/Testing</MenuItem>
                //     <MenuItem value={"Application Unsuccessful"}>Application Unsuccessful</MenuItem>
                   
//                   </Select>
//                 </FormControl>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   size="small"
//                   sx={{
//                     backgroundColor: "#ad2069",
//                     "&:hover": {
//                       backgroundColor: "#ff98b5",
//                     },
//                     marginTop: "16px",
//                   }}
//                    onClick={handleStatusChange}
//                 >
//                   Save
//                 </Button>
//               </div>
//               <Typography
//                 style={{ color: statusChangeMessageColor, marginLeft: "16px" }}
//               >
//                 {statusChangeMessage}
//               </Typography>
//               {/* Status Change Form */}
                            
//                             <Divider style={{ margin: "16px 0", color: "grey" }} />
//                             <DownloadCV   candidate_id={selectedCandidate.candidate_id} />
//                         </CardContent>
//                     </Card>
//                 ) : (
//                     <h1>No candidate data found</h1>
//                 )}
//             </DialogContent>
//         </Dialog>
//     );
// };

// export default CandidateDialog;

// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   Button,
//   Card,
//   CardContent,
//   Typography,
//   Divider,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   TextField, // Import TextField
// } from "@mui/material";
// import MailOutlineIcon from "@mui/icons-material/MailOutline";
// import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
// import WcOutlinedIcon from "@mui/icons-material/WcOutlined";
// import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
// import { API, graphqlOperation } from "aws-amplify";
// import { updateCandidate } from "../../graphql/mutations";
// import DownloadCV  from "./DownloadCV";
// const CandidateDialog = ({
//   open,
//   handleClose,
//   selectedCandidate,
//   selectedJobId,

//   handleNoteAddSuccess,
//   handleNoteAddError,
//   handleDeleteApplication,
// }) => {
//   const [newStatus, setNewStatus] = useState("");
//   const [note, setNote] = useState(""); // State for the note text
 
//   const [statusChangeMessage, setStatusChangeMessage] = useState(""); // State for status change message
//   const [noteMessage, setNoteMessage] = useState(""); // State for note message
  
  
//   const handleStatusChange = async () => {
//     try {
//       const input = {
//         id: selectedCandidate.id,
//         status: newStatus,
//       };

//       const response = await API.graphql(
//         graphqlOperation(updateCandidate, { input })
//       );

//       console.log("Candidate status updated:", response.data.updateCandidate);
//       setStatusChangeMessage("Status updated successfully"); // Set success message
//       handleNoteAddSuccess("Status updated successfully", "green"); // Notify the parent component
//     } catch (error) {
//       console.error("Error updating status:", error);
//       setStatusChangeMessage("Error updating status"); // Set error message
//       handleNoteAddError("Error updating status", "red"); // Notify the parent component
//     }
//   };

//   const handleNoteChange = (e) => {
//     setNote(e.target.value);
//   };

//   const handleSaveNote = async () => {
//     try {
//       const input = {
//         id: selectedCandidate.id,
//         note: note,
//       };

//       const response = await API.graphql(
//         graphqlOperation(updateCandidate, { input })
//       );

//       console.log("Note saved:", response.data.updateCandidate);
//       setNoteMessage("Note saved successfully"); // Set success message
//       handleNoteAddSuccess("Note saved successfully", "green"); // Notify the parent component
//     } catch (error) {
//       console.error("Error saving note:", error);
//       setNoteMessage("Error saving note"); // Set error message
//       handleNoteAddError("Error saving note", "red"); // Notify the parent component
//     }
//   };

//   return (
//     <Dialog
//       open={open}
//       onClose={handleClose}
//       style={{
//         width: "50%",
//         maxWidth: "none",
//         position: "fixed",
//         right: 1,
//         top: 0,
//         height: "100%",
//         borderRadius: 0,
//       }}
//       maxWidth="xl"
//       fullWidth
//     >
//       <Button
//         color="primary"
//         onClick={handleClose}
//         style={{
//           marginTop: "16px",
//           height: "30px",
//           width: "10px",
//           position: "fixed",
//           color: "black",
//         }}
//       >
//         X
//       </Button>

//       <DialogContent className="profilePopUp">
//         {selectedCandidate ? (
//           <Card className="candidate-card-profile" style={{ height: "100%" }}>
//             <CardContent
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "flex-start",
//                 height: "100%",
//                 padding: "16px",
//                 alignContent: "flex-start",
//               }}
//             >
//               <Typography variant="h4" sx={{ paddingTop: "15px", fontSize: "40px" }}>
//                 {selectedCandidate.first_name} {selectedCandidate.last_name} cv
//               </Typography>
//               {/* Other profile details */}
            //   <Typography sx={{ paddingTop: "35px", fontSize: "18px" }}>
            //     <MailOutlineIcon fontSize="small" /> Email: {selectedCandidate.email}
            //   </Typography>
            //   <Typography sx={{ paddingTop: "5px", fontSize: "18px" }}>
            //                     <LocalPhoneOutlinedIcon fontSize="small" /> Phone: {selectedCandidate.phone_number}
            //                 </Typography>
            //                 <Typography sx={{ paddingTop: "5px", fontSize: "18px" }}>
            //                     <AddLocationAltOutlinedIcon fontSize="small" /> Location: {selectedCandidate.location}
            //                 </Typography>
            //                 <Typography sx={{ paddingTop: "5px", fontSize: "18px" }}>
            //                     <WcOutlinedIcon fontSize="small" /> Gender: {selectedCandidate.gender}
            //                 </Typography>
            //                 <hr />
            //                 <Typography sx={{ paddingTop: "5px", fontSize: "18px" }}>
            //                     Position: {selectedCandidate.position}
            //                 </Typography>
            //                 <Typography sx={{ paddingTop: "5px", fontSize: "18px" }}>
            //                     Education: {selectedCandidate.education}
            //                 </Typography>
            //                 <Typography sx={{ paddingTop: "5px", fontSize: "18px" }}>
            //                     Experience: {selectedCandidate.work_experience}
            //                 </Typography>
            //                 <Typography sx={{ paddingTop: "5px", fontSize: "18px" }}>
            //                     Skills: {selectedCandidate.skills}
            //                 </Typography>
            //                 <Typography sx={{ paddingTop: "5px", fontSize: "18px" }}>
            //                     Certification: {selectedCandidate.certifications}
            //                 </Typography>
            //                 <Typography sx={{ paddingTop: "5px", fontSize: "18px" }}>
            //                     Department: {selectedCandidate.position}
            //                 </Typography>

//               {/* Status Change Form */}
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column", // Change to column layout
//                   alignItems: "flex-start",
//                   marginTop: "16px",
//                 }}
//               >
//                 <FormControl variant="outlined" sx={{ width: "300px" }}>
//                   <InputLabel>Status</InputLabel>
//                   <Select
//                     value={newStatus || ""}
//                     onChange={(e) => setNewStatus(e.target.value)}
//                     label="Status"
//                   >
                    // <MenuItem value={"Accepted"}>Accepted</MenuItem>
                    // <MenuItem value={"Accepted"}>Accepted</MenuItem>
                    // <MenuItem value={"Pending"}>Pending</MenuItem>
                    // <MenuItem value={"Application Received"}>Application Received</MenuItem>
                    // <MenuItem value={"Application Under Review"}>Application Under Review</MenuItem>
                    // <MenuItem value={"Interview Scheduled"}>Interview Scheduled</MenuItem>
                    // <MenuItem value={"Assessment/Testing"}>Assessment/Testing</MenuItem>
                    // <MenuItem value={"Application Unsuccessful"}>Application Unsuccessful</MenuItem>
//                   </Select>
//                 </FormControl>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   size="small"
//                   sx={{
//                     backgroundColor: "#ad2069",
//                     "&:hover": {
//                       backgroundColor: "#ff98b5",
//                     },
//                     marginTop: "16px",
//                   }}
//                   onClick={handleStatusChange}
//                 >
//                   Save Status
//                 </Button>
//                 <Typography style={{ color: "green", marginLeft: "16px" }}>
//                     {statusChangeMessage}</Typography>

//                 {/* Note TextField */}
//                 <TextField
//                   label="Note"
//                   multiline
//                   rows={4}
//                   variant="outlined"
//                   value={note}
//                   onChange={handleNoteChange}
//                   style={{ marginTop: "16px", width: "100%" }}
//                 />
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   size="small"
//                   sx={{
//                     backgroundColor: "#ad2069",
//                     "&:hover": {
//                       backgroundColor: "#ff98b5",
//                     },
//                     marginTop: "16px",
//                     width: "100%", // Make the button full width
//                   }}
//                   onClick={handleSaveNote}
//                 >
//                   Save Note
//                 </Button>
//               </div>
//               {/* Status Change Form */}
//               <Divider style={{ margin: "16px 0", color: "grey" }} />
//               <DownloadCV candidate_id={selectedCandidate.id} />
//             </CardContent>
//           </Card>
//         ) : (
//           <h1>No candidate data found</h1>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default CandidateDialog;

// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   Button,
//   Card,
//   CardContent,
//   Typography,
//   Divider,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   TextField,
// } from "@mui/material";
// import MailOutlineIcon from "@mui/icons-material/MailOutline";
// import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
// import WcOutlinedIcon from "@mui/icons-material/WcOutlined";
// import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
// import { API, graphqlOperation } from "aws-amplify";
// import { updateCandidate } from "../../graphql/mutations";
// import DownloadCV from "./DownloadCV";

// const CandidateDialog = ({
//   open,
//   handleClose,
//   selectedCandidate,
//   selectedJobId,
//   handleNoteAddSuccess,
//   handleNoteAddError,
// }) => {
//   const [newStatus, setNewStatus] = useState("");
//   const [note, setNote] = useState("");
//   const [statusChangeMessage, setStatusChangeMessage] = useState("");
//   const [noteMessage, setNoteMessage] = useState("");

//   const handleStatusChange = async () => {
//     try {
//       const input = {
//         id: selectedCandidate.id,
//         status: newStatus,
//       };

//       const response = await API.graphql(
//         graphqlOperation(updateCandidate, { input })
//       );

//       console.log("Candidate status updated:", response.data.updateCandidate);
//       setStatusChangeMessage("Status updated successfully");
//       handleNoteAddSuccess("Status updated successfully", "green");
//     } catch (error) {
//       console.error("Error updating status:", error);
//       setStatusChangeMessage("Error updating status");
//       handleNoteAddError("Error updating status", "red");
//     }
//   };

//   const handleNoteChange = (e) => {
//     setNote(e.target.value);
//   };

//   const handleSaveNote = async () => {
//     try {
//       const input = {
//         id: selectedCandidate.id,
//         note: note,
//       };

//       const response = await API.graphql(
//         graphqlOperation(updateCandidate, { input })
//       );

//       console.log("Note saved:", response.data.updateCandidate);
//       setNoteMessage("Note saved successfully");
//       handleNoteAddSuccess("Note saved successfully", "green");
//     } catch (error) {
//       console.error("Error saving note:", error);
//       setNoteMessage("Error saving note");
//       handleNoteAddError("Error saving note", "red");
//     }
//   };

//   return (
//     <Dialog
//       open={open}
//       onClose={handleClose}
//       style={{
//         width: "50%",
//         maxWidth: "none",
//         position: "fixed",
//         right: 1,
//         top: 0,
//         height: "100%",
//         borderRadius: 0,
//       }}
//       maxWidth="xl"
//       fullWidth
//     >
//       <Button
//         color="primary"
//         onClick={handleClose}
//         style={{
//           marginTop: "16px",
//           height: "30px",
//           width: "10px",
//           position: "fixed",
//           color: "black",
//         }}
//       >
//         X
//       </Button>

//       <DialogContent className="profilePopUp">
//         {selectedCandidate ? (
//           <Card className="candidate-card-profile" style={{ height: "100%" }}>
//             <CardContent
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "flex-start",
//                 height: "100%",
//                 padding: "16px",
//                 alignContent: "flex-start",
//               }}
//             >
//               <Typography variant="h4" sx={{ paddingTop: "15px", fontSize: "40px" }}>
//                 {selectedCandidate.first_name} {selectedCandidate.last_name} cv
//               </Typography>
            //   <Typography sx={{ paddingTop: "35px", fontSize: "18px" }}>
            //     <MailOutlineIcon fontSize="small" /> Email: {selectedCandidate.email}
            //   </Typography>
            //   <Typography sx={{ paddingTop: "5px", fontSize: "18px" }}>
            //                     <LocalPhoneOutlinedIcon fontSize="small" /> Phone: {selectedCandidate.phone_number}
            //                 </Typography>
            //                 <Typography sx={{ paddingTop: "5px", fontSize: "18px" }}>
            //                     <AddLocationAltOutlinedIcon fontSize="small" /> Location: {selectedCandidate.location}
            //                 </Typography>
            //                 <Typography sx={{ paddingTop: "5px", fontSize: "18px" }}>
            //                     <WcOutlinedIcon fontSize="small" /> Gender: {selectedCandidate.gender}
            //                 </Typography>
            //                 <hr />
            //                 <Typography sx={{ paddingTop: "5px", fontSize: "18px" }}>
            //                     Position: {selectedCandidate.position}
            //                 </Typography>
            //                 <Typography sx={{ paddingTop: "5px", fontSize: "18px" }}>
            //                     Education: {selectedCandidate.education}
            //                 </Typography>
            //                 <Typography sx={{ paddingTop: "5px", fontSize: "18px" }}>
            //                     Experience: {selectedCandidate.work_experience}
            //                 </Typography>
            //                 <Typography sx={{ paddingTop: "5px", fontSize: "18px" }}>
            //                     Skills: {selectedCandidate.skills}
            //                 </Typography>
            //                 <Typography sx={{ paddingTop: "5px", fontSize: "18px" }}>
            //                     Certification: {selectedCandidate.certifications}
            //                 </Typography>
            //                 <Typography sx={{ paddingTop: "5px", fontSize: "18px" }}>
            //                     Department: {selectedCandidate.position}
            //                 </Typography>

//               <hr />

//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "flex-start",
//                   marginTop: "16px",
//                 }}
//               >
//                 <FormControl variant="outlined" sx={{ width: "300px" }}>
//                   <InputLabel>Status</InputLabel>
//                   <Select
//                     value={newStatus || ""}
//                     onChange={(e) => setNewStatus(e.target.value)}
//                     label="Status"
//                   >
                  
//                     <MenuItem value={"Accepted"}>Accepted</MenuItem>
//                     <MenuItem value={"Accepted"}>Accepted</MenuItem>
//                     <MenuItem value={"Pending"}>Pending</MenuItem>
//                     <MenuItem value={"Application Received"}>Application Received</MenuItem>
//                     <MenuItem value={"Application Under Review"}>Application Under Review</MenuItem>
//                     <MenuItem value={"Interview Scheduled"}>Interview Scheduled</MenuItem>
//                     <MenuItem value={"Assessment/Testing"}>Assessment/Testing</MenuItem>
//                     <MenuItem value={"Application Unsuccessful"}>Application Unsuccessful</MenuItem>
//                   </Select>
//                 </FormControl>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   size="small"
//                   sx={{
//                     backgroundColor: "#ad2069",
//                     "&:hover": {
//                       backgroundColor: "#ff98b5",
//                     },
//                     marginTop: "16px",
//                   }}
//                   onClick={handleStatusChange}
//                 >
//                   Save Status
//                 </Button>
//                 <Typography style={{ color: "green", marginLeft: "16px" }}>{statusChangeMessage}</Typography>

//                 <TextField
//                   label="Note"
//                   multiline
//                   rows={4}
//                   variant="outlined"
//                   value={note}
//                   onChange={handleNoteChange}
//                   style={{ marginTop: "16px", width: "100%" }}
//                 />
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   size="small"
//                   sx={{
//                     backgroundColor: "#ad2069",
//                     "&:hover": {
//                       backgroundColor: "#ff98b5",
//                     },
//                     marginTop: "16px",
//                     width: "100%",
//                   }}
//                   onClick={handleSaveNote}
//                 >
//                   Save Note
//                 </Button>
//                 <Typography style={{ color: "green", marginLeft: "16px" }}>{noteMessage}</Typography>
//               </div>
//               <Divider style={{ margin: "16px 0", color: "grey" }} />
//             </CardContent>
//           </Card>
//         ) : (
//           <h1>No candidate data found</h1>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default CandidateDialog;


import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Button,
  Card,
  CardContent,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import WcOutlinedIcon from "@mui/icons-material/WcOutlined";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
import { API, graphqlOperation } from "aws-amplify";
import { updateCandidate } from "../../graphql/mutations";
import { getCandidate } from "../../graphql/queries"; // Import your query here
import DownloadCV from "./DownloadCV";

const CandidateDialog = ({
  open,
  handleClose,
  selectedCandidate,
  selectedJobId,
  handleNoteAddSuccess,
  handleNoteAddError,
}) => {
  const [newStatus, setNewStatus] = useState("");
  const [note, setNote] = useState("");
  const [statusChangeMessage, setStatusChangeMessage] = useState("");
  const [noteMessage, setNoteMessage] = useState("");

  useEffect(() => {
    // Fetch the candidate data when the dialog opens
    if (open && selectedCandidate) {
      fetchCandidateData(selectedCandidate.id);
    }
  }, [open, selectedCandidate]);

  const fetchCandidateData = async (candidateId) => {
    try {
      const response = await API.graphql(
        graphqlOperation(getCandidate, {
          id: candidateId,
        })
      );

      const candidateData = response.data.getCandidate;
      setNote(candidateData.note);
    } catch (error) {
      console.error("Error fetching candidate data:", error);
    }
  };

  const handleStatusChange = async () => {
    try {
      const input = {
        id: selectedCandidate.id,
        status: newStatus,
      };

      const response = await API.graphql(
        graphqlOperation(updateCandidate, { input })
      );

      console.log("Candidate status updated:", response.data.updateCandidate);
      setStatusChangeMessage("Status updated successfully");
    //   handleNoteAddSuccess("Status updated successfully", "green");
    } catch (error) {
      console.error("Error updating status:", error);
      setStatusChangeMessage("Error updating status");
    //   handleNoteAddError("Error updating status", "red");
    }
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleSaveNote = async () => {
    try {
      const input = {
        id: selectedCandidate.id,
        note: note,
      };

      const response = await API.graphql(
        graphqlOperation(updateCandidate, { input })
      );

      console.log("Note saved:", response.data.updateCandidate);
      setNoteMessage("Note saved successfully");
      handleNoteAddSuccess("Note saved successfully", "green");
    } catch (error) {
      console.error("Error saving note:", error);
      setNoteMessage("Error saving note");
      handleNoteAddError("Error saving note", "red");
    }
  };

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
        style={{
          marginTop: "16px",
          height: "30px",
          width: "10px",
          position: "fixed",
          color: "black",
        }}
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
                {selectedCandidate.first_name} {selectedCandidate.last_name} cv
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

              <hr />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  marginTop: "16px",
                }}
              >
                <FormControl variant="outlined" sx={{ width: "300px" }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={newStatus || ""}
                    onChange={(e) => setNewStatus(e.target.value)}
                    label="Status"
                  >
                  
                    <MenuItem value={"Accepted"}>Accepted</MenuItem>
                    <MenuItem value={"Accepted"}>Accepted</MenuItem>
                    <MenuItem value={"Pending"}>Pending</MenuItem>
                    <MenuItem value={"Application Received"}>Application Received</MenuItem>
                    <MenuItem value={"Application Under Review"}>Application Under Review</MenuItem>
                    <MenuItem value={"Interview Scheduled"}>Interview Scheduled</MenuItem>
                    <MenuItem value={"Assessment/Testing"}>Assessment/Testing</MenuItem>
                    <MenuItem value={"Application Unsuccessful"}>Application Unsuccessful</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{
                    backgroundColor: "#ad2069",
                    "&:hover": {
                      backgroundColor: "#ff98b5",
                    },
                    marginTop: "16px",
                  }}
                  onClick={handleStatusChange}
                >
                  Save Status
                </Button>
                <Typography style={{ color: "green", marginLeft: "16px" }}>{statusChangeMessage}</Typography>

                <TextField
                  label="Note"
                  multiline
                  rows={4}
                  variant="outlined"
                  value={note}
                  onChange={handleNoteChange}
                  style={{ marginTop: "16px", width: "100%" }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{
                    backgroundColor: "#ad2069",
                    "&:hover": {
                      backgroundColor: "#ff98b5",
                    },
                    marginTop: "16px",
                    width: "100%",
                  }}
                  onClick={handleSaveNote}
                >
                  Save Note
                </Button>
                <Typography style={{ color: "green", marginLeft: "16px" }}>{noteMessage}</Typography>
              </div>
              <Divider style={{ margin: "16px 0", color: "grey" }} />
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


     {/* <div style={{ display: "flex", alignItems: "center", marginTop: "16px" }}>
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
                            </div> */}