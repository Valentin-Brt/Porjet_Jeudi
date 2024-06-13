import { useState, useEffect, useRef } from "react";
import "./App.css";

const initialGuests = JSON.parse(localStorage.getItem("guests")) || [];

const App = () => {
  const [guests, setGuests] = useState(initialGuests); // État des invités
  const [selectedGuest, setSelectedGuest] = useState(null); // État de l'invité sélectionné
  const [newGuest, setNewGuest] = useState({
    name: "",
    age: 0,
    major: false,
    hobbies: "",
  }); // État du nouvel invité à ajouter

  const isFirstRender = useRef(true); // Référence pour vérifier le premier rendu du composant

  useEffect(() => {
    // Effet pour mettre à jour localStorage lorsque guests change
    if (!isFirstRender.current) {
      // Vérifie si ce n'est pas le premier rendu
      localStorage.setItem("guests", JSON.stringify(guests)); // Met à jour localStorage avec la liste des invités
    } else {
      isFirstRender.current = false; // Passe isFirstRender à false après le premier rendu
    }
  }, [guests]); // Dépendance : surveille les changements dans guests

  const handleNewGuestChange = (e) => {
    // Gestionnaire de changement pour les champs du formulaire d'ajout d'invité
    const { name, value, type, checked } = e.target;
    setNewGuest((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value, // Met à jour les valeurs du nouvel invité en fonction du type de champ
    }));
  };

  const handleAddGuest = (e) => {
    // Gestionnaire pour ajouter un nouvel invité
    e.preventDefault(); // Empêche le comportement par défaut du formulaire

    // Validation des champs obligatoires et des conditions d'âge
    if (!newGuest.name || newGuest.age === 0 || !newGuest.hobbies) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    if (newGuest.age < 0 || newGuest.age < 1) {
      alert("L'âge ne peut pas être négatif ou inférieur à 1 an.");
      return;
    }

    if (newGuest.age < 18 && newGuest.major) {
      alert(
        "Un invité de moins de 18 ans ne peut pas être marqué comme majeur."
      );
      return;
    }

    // Création de l'objet invité à ajouter à la liste
    const guestToAdd = {
      ...newGuest,
      id: guests.length + 1, // Attribution d'un nouvel identifiant unique
      hobbies: newGuest.hobbies.split(",").map((hobby) => hobby.trim()), // Transformation des hobbies en tableau
    };

    // Mise à jour de la liste des invités et réinitialisation du formulaire
    setGuests([...guests, guestToAdd]);
    setNewGuest({ name: "", age: 0, major: false, hobbies: "" });
  };

  const handleSelectGuest = (e) => {
    // Gestionnaire pour sélectionner un invité dans la liste
    const guestId = Number(e.target.value);
    const guest = guests.find((g) => g.id === guestId); // Recherche de l'invité par son identifiant
    setSelectedGuest(guest); // Mise à jour de l'état de l'invité sélectionné
  };

  const handleDeleteGuest = (guestId) => {
    // Gestionnaire pour supprimer un invité de la liste
    const updatedGuests = guests.filter((guest) => guest.id !== guestId); // Filtrage des invités pour exclure celui à supprimer
    setGuests(updatedGuests); // Mise à jour de la liste des invités

    if (selectedGuest?.id === guestId) {
      // Si l'invité supprimé était sélectionné, réinitialiser l'état de l'invité sélectionné
      setSelectedGuest(null);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleAddGuest} className="form-container">
        {/* Formulaire d'ajout d'invité */}
        <label>
          Nom :
          <input
            type="text"
            name="name"
            value={newGuest.name}
            onChange={handleNewGuestChange}
          />
        </label>
        <label>
          Âge :
          <input
            type="number"
            name="age"
            value={newGuest.age}
            onChange={handleNewGuestChange}
          />
        </label>
        <label>
          Majeur :
          <input
            type="checkbox"
            name="major"
            checked={newGuest.major}
            onChange={handleNewGuestChange}
          />
        </label>
        <label>
          Hobbies :
          <input
            type="text"
            name="hobbies"
            value={newGuest.hobbies}
            onChange={handleNewGuestChange}
          />
        </label>
        <button type="submit">Ajouter Invité</button>
      </form>

      {/* Sélection de l'invité */}
      <h2>Sélectionner un invité</h2>
      <select onChange={handleSelectGuest}>
        <option value=""> Sélectionnez un invité </option>
        {guests.map((guest) => (
          <option key={guest.id} value={guest.id}>
            {guest.name}
          </option>
        ))}
      </select>

      {/* Affichage des détails de l'invité sélectionné */}
      {selectedGuest && (
        <div className="guest-details">
          <h2>Détails Invité</h2>
          <p>Nom : {selectedGuest.name}</p>
          <p>Âge : {selectedGuest.age}</p>
          <p>Majeur : {selectedGuest.major ? "Oui" : "Non"}</p>
          <p>Hobbies : {selectedGuest.hobbies.join(", ")}</p>
          {/* Bouton de suppression de l'invité */}
          <button
            onClick={() => handleDeleteGuest(selectedGuest.id)}
            className="delete-button"
          />
        </div>
      )}

      {/* Liste des invités */}
      <div className="guest-list">
        <h2>Liste des invités</h2>
        <ul>
          {guests.map((guest) => (
            <li key={guest.id}>
              {guest.name}
              {/* Bouton de suppression de l'invité dans la liste */}
              <button
                onClick={() => handleDeleteGuest(guest.id)}
                className="delete-button"
              >
                {/* Utilisation de la croix rouge avec CSS */}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
