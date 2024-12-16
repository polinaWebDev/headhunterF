import useMyCompanies from "../../hooks/useMyCompanies.ts";
import { Link } from 'react-router-dom';
import React from "react";
import style from "./style.module.css"

const MyCompaniesPage: React.FC = () => {
    const userId = sessionStorage.getItem("userId");

    const {companies, loading, error} = useMyCompanies(userId);

    if (loading) return <p>Loading...</p>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className={`${style.companies}`}>
            <h2>My Companies</h2>
            <h6>Create your company</h6>
            <Link to={`/companies/create`}>
                <button>Create company</button>
            </Link>
            {companies.length > 0 ? (
                <ul>
                    {companies.map((company) => (
                        <li key={company.company_id} className={`${style.card}`}>
                            <Link to={`/company/${company.company_id}`}>
                                <h3 style={{color: 'black'}}>{company.name}</h3>
                                <p style={{color: 'black'}}>{company.description}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No companies found.</p>
            )}
        </div>
    )


}

export default MyCompaniesPage;