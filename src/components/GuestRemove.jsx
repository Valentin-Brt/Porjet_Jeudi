function GuestRemove({ onRemove, guest }) {
  return (
    <span
      style={{ cursor: 'pointer', color: 'red', fontSize: '20px' }}
      onClick={() => onRemove(guest)}
    >
      x
    </span>
  );
}

export default GuestRemove;
