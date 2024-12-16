import React, { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import useCompanyDetails from "../../../hooks/useCompanyDetails.ts";
import { apiClient } from "../../../api/axios.ts";
import JobApplications from "../../../components/JobList/JobApplication.tsx";
import CompanyEditForm from "../../../components/Company/CompanyEditForm.tsx";
import JobInlineEdit from "../../../components/JobList/JobInlineEdit.tsx";
import style from './style.module.css'

interface Job {
    job_id?: string;
    title: string;
    description: string;
    salary: string;
    company?: {
        company_id: number;
        name: string;
    };
}

const CompanyDetailPage: React.FC = () => {
    const { companyId } = useParams<{ companyId: string }>();
    if (!companyId) return;

    const { company, error, handleRoleChange, loading } = useCompanyDetails(companyId!);
    const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [showApplications, setShowApplications] = useState(false);

    const [editingJobId, setEditingJobId] = useState<string | null>(null); // ID редактируемой вакансии

    const [newJob, setNewJob] = useState<Job>({ title: "", description: "", salary: "" });

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await apiClient.get<Job[]>(`/jobs/${companyId}`); // Запрос на получение вакансий
                setJobs(response.data);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        if (companyId) {
            fetchJobs();
        }
    }, [companyId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewJob({ ...newJob, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (company) {
            const currentMember = company.members?.find(
                (member) => member.user.id === sessionStorage.getItem("userId")
            );
            setCurrentUserRole(currentMember ? currentMember.role : null);
        }
    }, [company]);

    const handleSaveJob = (updatedJob: Job) => {
        setJobs((prevJobs) =>
            prevJobs.map((job) => (job.job_id === updatedJob.job_id ? updatedJob : job))
        );
        setEditingJobId(null); // Выходим из режима редактирования
    };

    if (loading) return <p>Loading...</p>; // Добавлено отображение загрузки
    if (error) return <p>{error}</p>;
    if (!company) return <p>Company not found.</p>; // Более информативное сообщение

    const canEditRole = currentUserRole === "owner";

    const handleCreateJob = async () => {
        try {
            await apiClient.post(`/post/jobs/${companyId}`, newJob);
            setNewJob({ title: "", description: "", salary: "" }); // Очищаем форму
            alert("Job created successfully!");
        } catch (error) {
            console.error("Error creating job:", error);
            alert("Failed to create job.");
        }
    };

    const canCreateJob = currentUserRole === "owner" || currentUserRole === "manager";

    return (
        <div className={`${style.details}`}>
            <h2>Company Details</h2>

            <Link to={`/chats/${companyId}`}>
                <button className={`${style.cta_btn}`}>View Chats</button>
            </Link>

            <div className={`${style.info}`}>
                <div className={`${style.text_information}`}>
                    <h3>{company.name}</h3>
                    <p>{company.description}</p>
                </div>



                <CompanyEditForm companyId={companyId}/>

                <h3>Members</h3>
                <ul>
                    {company?.members?.map((member) => (
                        <li key={member.user.id}>
                            {member.user.name} - {member.role}
                            {canEditRole && member.user.id !== company?.owner?.id && (
                                <select
                                    value={member.role}
                                    onChange={(e) => handleRoleChange(member.user.id, e.target.value)}
                                >
                                    <option value="member">Member</option>
                                    <option value="manager">Manager</option>
                                </select>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                {canCreateJob && (
                    <div className={`${style.createForm}`}>
                        <h3>Create New Job</h3>
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={newJob.title}
                            onChange={handleInputChange}
                        />
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={newJob.description}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="salary"
                            placeholder="Salary"
                            value={newJob.salary}
                            onChange={handleInputChange}
                        />
                        <button className={`${style.cta_btn}`} onClick={handleCreateJob}>Create Job</button>
                    </div>
                )}
            </div>
            <h3>Jobs</h3>
            <ul>
                {jobs.map((job) => (
                    <li key={job.job_id ?? "unknown-job"} className={`${style.card}`}>
                        {editingJobId === job.job_id ? (
                            <JobInlineEdit
                                job={job}
                                onCancel={() => setEditingJobId(null)}
                                onSave={handleSaveJob}
                            />
                        ) : (
                            <>
                                <h4>{job.title}</h4>
                                <p>{job.description}</p>
                                <p>Salary: {job.salary}</p>
                                <button className={`${style.cta_btn}`} onClick={() => setEditingJobId(job.job_id!)}>
                                    Edit
                                </button>
                            </>
                        )}
                        <button className={`${style.cta_btn}`} onClick={() => setShowApplications(!showApplications)}>
                            {showApplications ? "Hide Applications" : "View Applications"}
                        </button>
                        {showApplications && job.job_id && <JobApplications jobId={job.job_id} />}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CompanyDetailPage;