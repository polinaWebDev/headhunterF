import React from 'react';
import useResumeManager from "../../hooks/useResumeProps.ts";

const ResumeManager: React.FC = () => {
    const {
        resumes,
        editingResumeId,
        newResumeTitle,
        setNewResumeTitle,
        handleSaveResume,
        handleEditResume,
        handleNewResume,
    } = useResumeManager();

//Todo: контент сделай также как и тайтл


    return (
        <div>
            <h2>My Resumes</h2>
            <button onClick={handleNewResume}>Create New Resume</button>

            <div>
                <h3>{editingResumeId ? 'Edit Resume' : 'New Resume'}</h3>
                <input
                    type="text"
                    placeholder="Resume Title"
                    value={newResumeTitle}
                    onChange={(e) => setNewResumeTitle(e.target.value)}
                />
                <div
                    id="editorjs"
                    style={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}
                ></div>
                <button onClick={handleSaveResume}>
                    {editingResumeId ? 'Update Resume' : 'Save Resume'}
                </button>
            </div>

            <ul>
                {resumes.map((resume) => (
                    <li key={resume.resume_id}>
                        <h4>{resume.title}</h4>
                        <button onClick={() => handleEditResume(resume.resume_id)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ResumeManager;