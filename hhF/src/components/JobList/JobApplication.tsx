import useApplications from "../../hooks/useApplications.ts";
import style from "./styles.module.css"

interface JobApplicationsProps {
    jobId: string;
}


const JobApplications: React.FC<JobApplicationsProps> = ({jobId}) => {
    const {applications, updateApplicationStatus, error} = useApplications(jobId)

    if (error) {
        return <p>{error}</p>
    }

    return (
        <div>
            <h4>Applications</h4>
            {applications.length > 0 ? (
                <ul>
                    {applications.map((app) => (
                        <li key={app.application_id}>
                            {app.user.name} - {app.status}
                            <button className={`${style.accept}`} onClick={() => updateApplicationStatus(app.application_id, 'accepted')}>
                                Accept
                            </button>
                            <button onClick={() => updateApplicationStatus(app.application_id, 'rejected')}>
                                Reject
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No applications found.</p>
            )}
        </div>
    )
}

export default JobApplications;