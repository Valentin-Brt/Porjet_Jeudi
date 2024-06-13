import { useState } from 'react';

function GuestAdd({ onAddGuest }) {
  const [name, setName] = useState('');

  const handleGuest = () => {
    setName('');
    onAddGuest(name);
  };
  return (
    <div>
      <h3>Add a guest</h3>
      <label>Name</label>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={handleGuest} disabled={name.length <= 3}>
        Add a guest
      </button>
    </div>
  );
}

export default GuestAdd;
