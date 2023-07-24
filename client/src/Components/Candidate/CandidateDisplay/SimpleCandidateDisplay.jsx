import {NavLink} from "react-router-dom";

export function SimpleCandidateDisplay({ ID, FirstName, LastName, Email, location}) {
    return (
        <NavLink to={`/Candidates/${id}`}>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">
                        Candidate Number {ID} : {FirstName} {LastName}
                    </h5>
                    <p className="card-text">{Email}</p>
                    <p className="card-text">{location}</p>
                </div>
            </div>
        </NavLink>
    );
}