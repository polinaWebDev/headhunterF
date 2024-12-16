import {useEffect, useState} from "react";
import {apiClient} from "../api/axios.ts";

interface Application {
    application_id: number;
    status: string;
    user: {
        id: string;
        name: string;
    }
}

//UseEffect - говно для запросов !!!!!!!! (см. доку реакта)

const useApplications = (jobId: string) => {
    const [applications, setApplications] = useState<Application[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const res = await apiClient.get(`/job/${jobId}/applications`);
                setApplications(res.data);
            } catch (err) {
                console.error('Error fetching applications:', err);
                setError('Failed to load applications');
            }
        }
        fetchApplications();
    }, [jobId]);

    const updateApplicationStatus = async (applicationId: number, newStatus: 'accepted' | 'rejected') => {
        try {
            await apiClient.put(`/application/${applicationId}/status`, {status: newStatus});
            setApplications((prevApplications) =>
                prevApplications.filter((app) =>
                    newStatus === 'accepted' ? app.application_id !== applicationId : true
                )
            );
        } catch (err) {
            console.error('Error fetching applications:', err);
            setError('Failed to update applications');
        }
    };

    return {applications, updateApplicationStatus, error};
}

export default useApplications;