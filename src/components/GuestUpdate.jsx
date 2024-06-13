import { useState } from 'react';

function GuestUpdate({ onUpdate, idx, guest, onVisible }) {
  const [name, setName] = useState(guest);
  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={() => onUpdate(name, idx) & onVisible(false)}>
        Update
      </button>
    </div>
  );
}

export default GuestUpdate;
