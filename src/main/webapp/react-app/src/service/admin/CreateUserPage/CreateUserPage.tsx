import React, { useState } from 'react';

function CreateUserPage() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const handleCreateUser = () => {
        const userData = {
            login,
            password,
            email,
            firstName,
            lastName,
            isAdmin
        };

        fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                console.error('Error creating user:', error);
            });
    };

    return (
        <div>
            <h2>Create User</h2>
            <input type="text" value={login} onChange={e => setLogin(e.target.value)} placeholder="Login" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" />
            <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name" />
            <label>
                Is Admin:
                <input type="checkbox" checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)} />
            </label>
            <button onClick={handleCreateUser}>Create User</button>
        </div>
    );
}

export default CreateUserPage;
