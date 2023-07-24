import DeatiledCandidate from './DetailedCandidate';

export default function DetailedCandidate({ ID, FirstName, LastName, Email, Phone, location, gender, Education, work_experience, skills, position, certifications, deleteCandidate }) {
    return (
     <div className="card">
        <div className="card-body">
            <h1 className="card-title">Candidate Number {ID}</h1>
            <h2 className="card-text">First Name: {FirstName}</h2>
            <h3 className="card-text">Last Name: {LastName}</h3>
            <h4 className="card-text">Email: {Email}</h4>
            <h5 className="card-text">Phone: {Phone}</h5>
            <h6 className="card-text">Location: {location}</h6>
            </div>
     </div>
    );
}