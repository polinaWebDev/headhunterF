import React, {useState} from "react";
import { useAtom } from 'jotai';
import {authAtom} from "../../atoms/authAtom.ts";
import { useNavigate } from 'react-router-dom';
import { login} from '../../api/axios.ts'
import style from "./style.module.css"

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');
    const [, setIsAuth] = useAtom(authAtom)
    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const data = await login(email, password);
            localStorage.setItem('token', data.token);
            sessionStorage.setItem('userId', data.userId);
            setIsAuth(true);
            navigate('/')
        } catch (err) {
            setErr('Incorrect email or password');
        }
    };

    return (
        <div className={`${style.container}`}>
            <div className={`${style.wrapper}`}>
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
                {err && <p>{err}</p>}
            </div>
        </div>
    )
}

export default LoginPage;