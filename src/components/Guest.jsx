function Guest({ name, onClick }) {
  return (
    <li style={{ cursor: 'pointer' }} onClick={onClick}>
      {name}
    </li>
  );
}

export default Guest;
