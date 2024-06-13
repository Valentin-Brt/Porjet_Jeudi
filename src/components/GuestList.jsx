import { useState } from 'react';
import Guest from './Guest';
import GuestAdd from './GuestAdd';
import GuestRemove from './GuestRemove';
import GuestUpdate from './GuestUpdate';

function GuestList() {
  const [guests, setGuests] = useState(['Alex']);
  const [isUpdate, setUpdate] = useState(false);

  const handleAddGuest = name => {
    setGuests(prevState => [...prevState, name]);
  };

  const removeGuest = guest => setGuests(guests.filter(el => el !== guest));

  const updateGuest = (name, idx) =>
    setGuests(guests.map((guest, idxMap) => (idxMap === idx ? name : guest)));

  return (
    <>
      <GuestAdd onAddGuest={handleAddGuest} />
      <ul>
        {guests.map((guest, idx) => (
          <div
            style={{ display: 'flex', gap: '5px', alignItems: 'center' }}
            key={idx}
          >
            <Guest key={idx} name={guest} onClick={() => setUpdate(true)} />
            <GuestRemove guest={guest} onRemove={removeGuest} />
            {isUpdate && (
              <GuestUpdate
                onVisible={setUpdate}
                guest={guest}
                onUpdate={updateGuest}
                idx={idx}
              />
            )}
          </div>
        ))}
      </ul>
    </>
  );
}

export default GuestList;
