// components/SaveUser.tsx
import { useState } from 'react';

const SaveUser = () => {
  const [name, setName] = useState<string>('');
  const [number, setNumber] = useState<string>('');

  const handleSave = async () => {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, number }),
    });
    const data = await response.json();
    if (response.ok) {
      alert('User saved successfully!');
    } else {
      alert(`Error: ${data.error}`);
    }
  };

  return (
    <div>
      <h2>Save User Data</h2>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <button onClick={handleSave}>Save User</button>
    </div>
  );
};

export default SaveUser;