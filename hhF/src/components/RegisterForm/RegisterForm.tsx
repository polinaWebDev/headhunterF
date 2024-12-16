import {FormEvent, useState} from "react";
import { useNavigate } from "react-router-dom";
import {registerUser} from "../../api/axios.ts";
import styles from './styles.module.css'


const RegisterForm = () => {
    const [name, setUserName] = useState('');
    const [email, setUserEmail] = useState('');
    const [password, setUserPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const userData = {name, email, password};
            const res = await registerUser(userData);

            if (res.status === 201) {
                setMessage('Registration successfully created!');
                navigate('/login')
            } else {
                setMessage('Error creating user');
            }
        } catch (error) {
            console.log(error);
            setMessage('Error creating user');
        }
    };

    return (
        <form className={`${styles.registerForm}`} onSubmit={handleSubmit}>
            <h1>Register</h1>
            <div className={`${styles.formGroup}`}>
                {message && <p>{message}</p>}
                <label>Username:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setUserEmail(e.target.value)}
                    required
                />
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setUserPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </div>
        </form>
    )
}

export default RegisterForm;