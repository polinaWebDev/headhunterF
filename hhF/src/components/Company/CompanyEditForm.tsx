import useCompanyEdit from "../../hooks/useCompanyEdit.ts";
import {useEffect, useState} from "react";
import style from "./style.module.css"

interface CompanyEditFormProps {
    companyId: string;
}

const CompanyEditForm: React.FC<CompanyEditFormProps> = ({ companyId }) => {
    const {company, updateCompany, error, loading, fetchCompany} = useCompanyEdit(companyId);
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    useEffect(() => {
        fetchCompany();
    }, [companyId]);

    useEffect(() => {
        if (companyId) {
            setName(companyId);
            setDescription(description);
        }
    }, [company]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await updateCompany({name, description});
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error</p>;
    }

    return (
        <div className={`${style.edit_form}`}>
            <h3>Edit Company</h3>
            <form onSubmit={handleSubmit}>
                <div className={`${style.form_inner}`}>
                    <label htmlFor="name">Name:</label>
                    <input
                        id="name"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className={`${style.form_inner}`}>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className={`${style.cta_btn}`}>Save Changes</button>
            </form>
        </div>
    )
}

export default CompanyEditForm;