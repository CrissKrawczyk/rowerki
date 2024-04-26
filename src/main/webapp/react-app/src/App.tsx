import React, {useState, useEffect} from 'react';
import './App.css';

interface User {
  firstName: string
}

function App() {

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch('api/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
  }, []);

  if (loading) {
    return <div>Loading</div>
  }

  return users.map(user => <div>{user.firstName}</div>)
}

export default App;
