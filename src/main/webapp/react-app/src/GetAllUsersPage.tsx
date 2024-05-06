import React, {useState, useEffect} from 'react';
import './App.css';

interface User {
    firstName: string;
    lastName: string;
    login: string;
    password: string;
    email: string;
    isAdmin: boolean;
}

function GetAllUsersPage() {

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        fetch('/api/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false); // Upewnij się, że zawsze ustawiasz loading na false, nawet w przypadku błędu.
            });
    }, []);

    if (loading) {
        return <div>Loading</div>
    }

    return users.map(user => <div>{user.firstName} {user.lastName}</div>)
}

export default GetAllUsersPage;
