import React from 'react';
import ResumeEditor from "../../components/Resume/ResumeEditor.tsx";

const ResumeEditorPage: React.FC = () => {
    const { userId } = sessionStorage


    if (!userId) {
        return <p>User ID is missing.</p>;
    }

    return (
        <div>
            <h2>Edit Resume</h2>
            <ResumeEditor />
        </div>
    );
};

export default ResumeEditorPage;
