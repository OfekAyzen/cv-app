import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import DetailedCandidate from "../../Components/Candidate/CandidateDisplay/DetailedCandidate.jsx";



function Candidate() {
    const {id} = useParams();
    const [candidate, setCandidate] = useState(null);
    const [isLoadingComments, setIsLoadingComments] = useState(false);
    const [showButton, setShowButton] = useState(true);
    const navigation = useNavigate();


    useEffect(() => {
        // const userID = JSON.parse(localStorage.getItem("User")).id;
        // fetch(`http://localhost:3000/candidate/${id}`)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         if (data.userId === userID) {
        //             setCandidate(data);
        //         } else {
        //             navigation("/NotFound");
        //         }
        //     });
    }, []);


    return (
        <main>
            {!candidate ? (
                <h2>Loading...</h2>
            ) : (
                <div>
                    <DetailedCandidate id={candidate.id} name={candidate.name} email={candidate.email} phone={candidate.phone} />
                </div>
            )}
        </main>
    );

}



