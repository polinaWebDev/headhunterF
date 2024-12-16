import {Company} from "./useCompanyDetails.ts";
import {useState} from "react";
import {apiClient} from "../api/axios.ts";

const useCompanyEdit = (company_id: string) => {
    const [company, setCompany] = useState<Company | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchCompany = async () => {
        setLoading(true);

        try {
            const res = await apiClient.get(`/details/${company_id}`);
            setCompany(res.data);
            setError(null)
        } catch (err) {
            console.error('Error fetching company details:', err);
            setError("Failed to load company details");
        } finally {
            setLoading(false);
        }
    };

    const updateCompany = async (updatedCompany: Partial<Company>) => { ///////?
        setLoading(true);

        try {
            const res = await apiClient.put(`/companies/company/${company_id}`, updatedCompany);
            setCompany(res.data.company);
            setError(null)
        } catch (err) {
            console.error('Error updating company details:', err);
            setError("Failed to update company details");
        } finally {
            setLoading(false);
        }
    };

    return {company, updateCompany, error, loading, fetchCompany};
}

export default useCompanyEdit;