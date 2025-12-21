// components/FetchUsers.tsx
import { useEffect, useState } from 'react';

interface User {
  _id: string;
  name: string;
  number: string;
}

const FetchUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const response = await fetch('/api/users');
    const data: User[] = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchUsers;