import {useEffect, useState} from "react";
import {apiClient} from "../api/axios.ts";

export interface Profile {
    email: string,
    name: string,
    id: string
}

export const useGetProfile = (token: string | null) => {
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [err, setErr] = useState<Error | null>(null);

    useEffect(() => {
        if (!token) {
            setErr(new Error("Token is missing"));
            setLoading(false);
            return;
        }

        const fetchProfile = async () => {
            try {
                const res = await apiClient.get<Profile>("/profile", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProfile(res.data);
            } catch (err) {
                setErr(err as Error);
                console.error("Error fetching profile:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [token]);




    return { profile, err, loading };
};