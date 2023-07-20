import {Candidate} from "../Candidate/Candidate.jsx";


export function Candidates({candidates, deleteCandidate}) {
    return (
        <ul className="list">
            {candidates.length === 0 && "No Candidates"}
            {candidates.map(candidate => {
                return (
                    <Candidate
                        {...candidate}
                        key={candidate.id}
                        deleteCandidate={deleteCandidate}
                    />
                )
            })}
        </ul>
    )
}