export function Candidate({ ID, FirstName, LastName, Email, Phone, location, gender, Education, work_experience, skills, position, certifications, deleteCandidate }) {
    return (
        <li>
            <label>
                <input

                />
                {ID}
                {FirstName}
                {LastName}
                {Email}
                {Phone}
                {location}
                {gender}
                {Education}
                {work_experience}
                {skills}
                {position}
                {certifications}
            </label>
            <button onClick={() => deleteCandidate(id)} className="btn btn-danger">
                Delete
            </button>

        </li>
    )
}