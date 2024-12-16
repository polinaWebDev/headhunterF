import axios from 'axios';
import  { useState, ChangeEvent } from 'react';

const SERVER_URL = 'http://localhost:3000';

interface UserAvatarUploadProps {
    userId: string;
}

const UserAvatarUpload: React.FC<UserAvatarUploadProps> = ({ userId }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('avatar', selectedFile);

        try {
            const response = await axios.post(`${SERVER_URL}/api/uploads/user/${userId}/avatar`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setAvatarUrl(response.data.ava);
        } catch (error) {
            console.error('Error uploading user avatar:', error);
        }
    };

    console.log(`${SERVER_URL}/${avatarUrl}`)

    return (
        <div>
            <h3>Upload User Avatar</h3>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {avatarUrl && (
                <div>
                    <h4>Uploaded Avatar:</h4>
                    <img src={`${SERVER_URL}/${avatarUrl}`} alt="User Avatar" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
                </div>
            )}
        </div>
    );
};

export default UserAvatarUpload;
