import {useEffect, useState} from "react";
import {CandidatesList} from "../..//Components/Candidate/CandidatesDisplay/CandidatesList.jsx"
import {NavLink} from "react-router-dom";
import axios from "axios";


export function Candidates() {
    const [candidates, setCandidates] = useState(() => {
        const localValue = localStorage.getItem("Candidates");
        if (localValue == null) return [];


    });

    useEffect(() => {

                axios.get("http://localhost:5000/view_all_candidates").then((response) => {
                    console.log(response.data);
                    setCandidates(response.data);
                })
                    .catch((error) => {
                        console.log(error);
                    });

    }, []);

    useEffect(() => {
        console.log("Posts has changed");
        localStorage.setItem("Candidates", JSON.stringify(Candidates));
    }, [Candidates]);

    return (
        <main>

            <div className="candidatesBody">
                <h1 className="header">Your Candidates</h1>
                {/*<CandidateList candidates={candidates}/>*/}
            </div>
        </main>
    );

}

export default Candidates;