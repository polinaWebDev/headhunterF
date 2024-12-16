import { useState } from "react";
import { apiClient } from "../api/axios.ts";

export const useEditProfile = () => {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateUsername = async (username: string, userId: string, token: string) => {
        setLoading(true);
        try {
            const res = await apiClient.put(`/update/user/${userId}`, { name: username }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.status === 200) {
                setMessage("Successfully updated profile");
                setUsername(username);
                setError(null);
            } else {
                setMessage("Failed to update profile");
            }
        } catch (err) {
            setError((err as Error).message);
            console.error("Error updating profile:", err);
            setMessage("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return {
        username,
        setUsername,
        message,
        loading,
        error,
        updateUsername
    };
};
