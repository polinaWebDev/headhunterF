import { useGetJobs } from "../../hooks/useGetJobs.ts";
import React, {  useState } from "react"; // useRef удален
import JobCard from "./JobCard.tsx";
import style from "./styles.module.css"

const JobList = () => {
    const [searchTitle, setSearchTitle] = useState("");
    const { jobs, loading, error } = useGetJobs(searchTitle);
    const userId = sessionStorage.getItem('userId') ?? ""; // Добавлено ?? "" для обработки null

    // useEffect для фокуса на input удален, так как он вызывал ненужные перерендеры

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTitle(e.target.value);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading jobs: {error.message}</p>; // Исправлено сообщение об ошибке


    return (
        <div className={`${style.jobs}`}>
            <input
                type="text"
                placeholder="Search jobs by title"
                value={searchTitle}
                onChange={handleSearchChange}
                autoFocus
            />
            <ul className={`${style.card_list}`}>
                {jobs.map(job => (
                    <JobCard key={job.id} job={job} userId={userId}  />
                ))}
            </ul>
        </div>
    );
};

export default JobList;