import {useGetProfile} from "../../hooks/useGetProgile.ts";
import React, {useState} from "react";
import {useEditProfile} from "../../hooks/useEditProfile.ts";
import UserAvatarUpload from "../../components/Avatars/UserAvatarsUpload.tsx";


export const ProfilePage = () => {
    const token = localStorage.getItem(`token`)
    const {err, loading, profile} = useGetProfile(token);
    const [isEditing, setIsEditing] = useState(false);

    const {
        username,
        setUsername,
        message,
        loading: updating,
        error,
        updateUsername,
    } = useEditProfile();

    const handleEditClick = () => {
        setUsername(profile?.name || "");
        setIsEditing(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (profile?.id && token) {
            await updateUsername(username, profile.id, token);
            setIsEditing(false);
        }
    };


    if (loading) return <p>Loading...</p>;
    if (err) return <p>Error: {err.message}</p>;

    if(!profile) return <p>Profile not found</p>;
    console.log(profile.id)

    return (
        <div>
            <h2>Profile Page</h2>

            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="">New Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required //?
                        />
                    </div>
                    <button type="submit" disabled={updating}>
                        {updating ? "Updating..." : "Update username"}
                    </button>
                    <button type="button" onClick={() => setIsEditing(false)}>
                        Cancel
                    </button>
                </form>
            ) : (
            <>
                <p>Username: {profile.name}</p>
                <button onClick={handleEditClick}>Edit Username</button>
                {message && <p>{message}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <p>Email: {profile.email}</p>

                <p>Avatar:</p>
                <UserAvatarUpload userId={profile.id} />
            </>
            )}
        </div>
    )
}