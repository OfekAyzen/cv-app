

export function Job({ ID, Description, Qualifications, Title, deleteJob }) {
    return (
        <li>
            <label>
                <input

                />
                {ID}
                {Description}
                {Qualifications}
                {Title}
            </label>
            <button onClick={() => deleteJob(id)} className="btn btn-danger">
                Delete
            </button>

        </li>
    )
}export