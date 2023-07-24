import {useEffect, useState} from "react";
import {CandidateList} from "../../Components/Candidate/CandidatesDisplay/CandidatesList.jsx";
import {NavLink} from "react-router-dom";


export function Candidates() {
    const [candidates, setCandidates] = useState(() => {
        const localValue = localStorage.getItem("Candidates");
        if (localValue == null) return [];

        return JSON.parse(localValue);

    });

    useEffect(() => {
        // const userID = JSON.parse(localStorage.getItem("User")).id;
        // if (posts.length === 0) {
        //     fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userID}`)
        //         .then((response) => response.json())
        //         .then((data) => setPosts(data));
        // }
    }, []);

    useEffect(() => {
        console.log("Posts has changed");
        localStorage.setItem("Candidates", JSON.stringify(Candidates));
    }, [Candidates]);

    return (
        <main>
            <NavLink to={`/Candidates/NewCandidate`}>
                <button>Create a new Candidate here</button>
            </NavLink>
            <div className="candidatesBody">
                <h1 className="header">Your Candidates</h1>
                <CandidateList candidates={candidates}/>
            </div>
        </main>
    );

}

export default Candidates;