import {SimpleCandidateDisplay} from "../CandidateDisplay/SimpleCandidateDisplay.jsx";
import "./CandidatesList.css";

export function CandidatesList({candidates}) {
    return (
        <div className="candidate-list">
            {candidates.map((candidate) => (
                <div className="candidate" key={candidate.id}>
                    <SimpleCandidateDisplay {...candidate} />
                </div>
            ))}
        </div>
    );
}