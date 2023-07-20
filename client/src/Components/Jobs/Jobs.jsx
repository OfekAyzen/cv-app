import {Job} from "../Job/Job.jsx";

export function Jobs({Jobs, deleteJob}) {
    return (
        <ul className="list">
            {Jobs.length === 0 && "No Jobs"}
            {Jobs.map(job => {
                return (
                    <job
                        {...job}
                        key={job.id}
                        deleteJob={deleteJob}
                    />
                )
            })}
        </ul>
    )
}