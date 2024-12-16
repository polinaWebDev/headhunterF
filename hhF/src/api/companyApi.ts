import {apiClient} from "./axios.ts";

export const createCompany = async (companyData: {
    name: string;
}) => {
    const res = await apiClient.post(`/companies/create`, companyData);
    console.log(res.data)
    return res.data;
}
