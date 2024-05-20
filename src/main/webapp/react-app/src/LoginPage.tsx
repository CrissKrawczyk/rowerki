import React, { useState } from 'react';

interface User {
    firstName: string;
    lastName: string;
    login: string;
    password: string;
    email: string;
    isAdmin: boolean;
}

interface LoginPageProps {
    onLogin: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        fetch(`/api/users/${login}/${password}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Invalid login or password');
                }
                return response.json();
            })
            .then(user => {
                onLogin(user);
            })
            .catch(error => {
                setError(error.message);
            });
    };

    return (
        <div>
            <h2>Login Page</h2>
            <input type="text" value={login} onChange={e => setLogin(e.target.value)} placeholder="Login" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
            {error && <div>{error}</div>}
        </div>
    );
};

export default LoginPage;
