import React, { useState } from "react";
import {apiClient} from "../../api/axios.ts";
import style from './styles.module.css'

interface Job {
    job_id?: string;
    title: string;
    description: string;
    salary: string;
}

interface JobInlineEditProps {
    job: Job;
    onCancel: () => void;
    onSave: (updatedJob: Job) => void;
}

const JobInlineEdit: React.FC<JobInlineEditProps> = ({ job, onCancel, onSave }) => {
    const [title, setTitle] = useState(job.title);
    const [description, setDescription] = useState(job.description);
    const [salary, setSalary] = useState(job.salary);

    const handleSave = async () => {
        try {
            const response = await apiClient.put(`/job/${job.job_id}`, {
                title,
                description,
                salary,
            });
            onSave(response.data); // Возвращает обновленные данные вакансии
        } catch (error) {
            console.error("Ошибка при сохранении вакансии:", error);
            alert("Не удалось сохранить изменения.");
        }
    };

    return (
        <div className={`${style.form_edit}`}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Название вакансии"
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Описание вакансии"
            />
            <input
                type="text"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="Зарплата"
            />
            <div className={`${style.btns}`}>
                <button className={`${style.accept}`} onClick={handleSave}>Сохранить</button>
                <button className={`${style.cancel}`} onClick={onCancel}>Отмена</button>
            </div>
        </div>
    );
};

export default JobInlineEdit;