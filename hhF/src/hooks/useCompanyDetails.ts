import {useEffect, useState} from "react";
import {apiClient} from "../api/axios.ts";

interface CompanyDetailsHook {
    company: Company | null;
    error: string | null;
    handleRoleChange: (userId: string, newRole: string) => void;
    loading: boolean;
}


export interface Company{
    company_id: string
    name: string
    description: string
    avatarUrl?: string;
    members?: Member[];
    owner?: User
}

interface Member {
    role: string;
    user: {
        id: string;
        name: string;
    }
}

interface User {
    id: string;
    name: string;
}

const useCompanyDetails = (companyId: string):CompanyDetailsHook => {
    const [company, setCompany] = useState<Company | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {


        const fetchCompanyDetails = async () => {
            setLoading(true)
            try {
                const response = await apiClient.get(`/details/${companyId}`);
                setCompany(response.data);
                console.log(response.data);
                setError(null)
            } catch (err) {
                console.error('Error fetching company details:', err);
                setError("Failed to load company details");
            } finally {
                setLoading(false);
            }
        };

        if (companyId) {
            fetchCompanyDetails();
        } else {
            console.error("Invalid companyId:", companyId);
        }

    }, [companyId]);

    const handleRoleChange = async (userId: string, newRole: string) => {

        if (!company) {
            return; // Или обработайте случай, когда company не задана
        }

        try {
            await apiClient.put(`/company/${companyId}/user/${userId}/role`, { role: newRole });
            setCompany((prevCompany) => {
                if (!prevCompany || !prevCompany.members) {
                    return prevCompany; // Или вернуть null, если prevCompany или prevCompany.members undefined
                }
                return {
                    ...prevCompany,
                    members: prevCompany.members.map((member) =>
                        member.user?.id === userId ? { ...member, role: newRole } : member
                    ),
                };
            });
        } catch (err) {
            console.error('Error updating role:', err);
            setError("Failed to update role");
        }
    };

    return {company, error, handleRoleChange, loading};
};

export default useCompanyDetails;