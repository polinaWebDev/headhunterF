import {useEffect, useState} from "react";
import {apiClient} from "../api/axios.ts";
import {Company} from "./useCompanyDetails.ts";


const useMyCompanies = (userId: string | null) => {
    const [companies, setCompanies] = useState<Company[]>([])
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompanies = async () => {
            if (!userId) {
                setError(error);
                console.log("Error fetching companies", error);
                return
            }

            try {
                const res = await apiClient.get<Company[]>(`/companies/my-companies/${userId}`)
                setCompanies(res.data);
                console.log(res.data);
            } catch (err) {
                console.error(error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();

    }, [userId]);

    return { companies, error, loading };
}

export default useMyCompanies;