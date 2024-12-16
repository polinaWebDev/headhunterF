import {useCallback, useEffect, useRef, useState} from "react";
import EditorJS, {OutputData} from "@editorjs/editorjs";
import {apiClient} from "../api/axios.ts";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";

interface Resume {
    resume_id: number;  // Используем number, а не string
    title: string;
    content: OutputData;
}

interface UseResumeManagerProps {
    initialResumes?: Resume[];
}

const useResumeManager = ({ initialResumes = [] }: UseResumeManagerProps = {}) => {
    const [resumes, setResumes] = useState<Resume[]>(initialResumes);
    const [editingResumeId, setEditingResumeId] = useState<number | null>(null);  // Убедитесь, что editingResumeId - number
    const [newResumeTitle, setNewResumeTitle] = useState<string>('');
    const editorInstance = useRef<EditorJS | null>(null);

    // Fetch resumes from the server
    const fetchResumes = useCallback(async () => {
        try {
            const response = await apiClient.get('/resumes');
            setResumes(response.data);
        } catch (err) {
            console.error('Error fetching resumes:', err);
        }
    }, []);

    useEffect(() => {
        fetchResumes();
    }, [fetchResumes]);

    const handleSaveResume = useCallback(async () => {
        console.log("Saving resume. Current editingResumeId:", editingResumeId); // Лог состояния
        if (!editorInstance.current) {
            console.warn("Editor instance not initialized!");
            return;
        }

        try {
            const content = await editorInstance.current.save();
            if (editingResumeId) {
                console.log("Updating existing resume:", editingResumeId); // Лог ID обновляемого резюме
                await apiClient.put(`/resumes/${editingResumeId}`, {
                    title: newResumeTitle,
                    content,
                });
                console.log("Successfully updated resume:", content);
                setResumes((prevResumes) =>
                    prevResumes.map((resume) =>
                        resume.resume_id === editingResumeId // Используйте resume_id
                            ? { ...resume, title: newResumeTitle, content }
                            : resume
                    )
                );
            } else {
                console.log("Creating new resume."); // Лог для нового резюме
                const response = await apiClient.post('/resumes', {
                    title: newResumeTitle,
                    content,
                });
                setResumes((prevResumes) => [...prevResumes, response.data]);
            }

            alert('Resume saved successfully!');
            setEditingResumeId(null);
            setNewResumeTitle('');
            editorInstance.current.clear();
        } catch (err) {
            console.error('Error saving resume:', err);
            alert('Failed to save resume.');
        }
    }, [editingResumeId, newResumeTitle]);

    // Initialize the EditorJS instance
    const initializeEditor = useCallback((data?: OutputData) => {
        editorInstance.current?.destroy();
        editorInstance.current = new EditorJS({
            holder: 'editorjs',
            data,
            tools: {
                header: Header,
                list: List,
                paragraph: Paragraph,
            },
        });
    }, []);

    // Edit an existing resume
    const handleEditResume = useCallback(
        async (id: number) => {  // Убедитесь, что id - это number
            console.log("Editing resume ID:", id); // Лог ID резюме
            const resume = resumes.find((r) => r.resume_id === id);
            if (!resume) {
                console.warn("Resume not found!");
                return;
            }

            setEditingResumeId(id);
            setNewResumeTitle(resume.title);
            console.log("Initializing editor with content:", resume.content);
            initializeEditor(resume.content);
            console.log("EditingResumeId after set:", id); // Лог после обновления состояния
        },
        [resumes, initializeEditor]
    );

    // Create a new resume
    const handleNewResume = useCallback(() => {
        setEditingResumeId(null);
        setNewResumeTitle('');
        initializeEditor();
    }, [initializeEditor]);

    return {
        resumes,
        editingResumeId,
        newResumeTitle,
        setNewResumeTitle,
        handleSaveResume,
        handleEditResume,
        handleNewResume,
    };
};

export default useResumeManager;