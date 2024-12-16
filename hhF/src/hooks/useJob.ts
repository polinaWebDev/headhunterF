import {useEffect, useState} from "react";
import {Job} from "./useGetJobs.ts";
import {apiClient} from "../api/axios.ts";

const useJob = (jobId: string) => {
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await apiClient.get<Job>(`/jobs/${jobId}`);
                setJob(response.data);
            } catch (err) {
                setError("Не удалось загрузить данные о вакансии.");
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    }, [jobId]);

    const updateJob = async (updatedJob: Partial<Job>) => {
        try {
            const response = await apiClient.put(`/jobs/${jobId}`, updatedJob);
            setJob(response.data);
        } catch (err) {
            setError("Не удалось обновить данные вакансии.");
        }
    };

    return { job, loading, error, updateJob };
};

export default useJob;
