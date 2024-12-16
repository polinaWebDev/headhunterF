import React, { useState } from 'react';
import axios from 'axios';
import style from "./styles.module.css"

interface JobCardProps {
    job: {
        job_id?: string;
        title: string;
        description: string;
        salary: string;
        company?: {
            company_id: string;
            name: string;
        };
    };
    userId: string;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
    const [applied, setApplied] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleApply = async () => {
        try {
            await axios.post(`http://localhost:3000/application/${job.job_id}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(job);
            setApplied(true);
        } catch (err) {
            setError('Авторизуйтесь, чтобы отправить заявку');
        }
    };

    return (
        <li className={`${style.card}`}>
            <h4>{job.title}</h4>
            <p>{job.salary}₽</p>
            {job.company && <p>Company: {job.company.name}</p>}
            <button className={`${style.apply_btn}`} onClick={handleApply} disabled={applied}>
                {applied ? 'Application Submitted' : 'Apply Now'}
            </button>
            {error && <p style={{color: 'red'}}>{error}</p>}
        </li>
    );
};

export default JobCard;