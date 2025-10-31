import React, { useState, useEffect } from 'react';
import '../App.css';
import ShowContacts from './ShowContacts';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('contacts') : null;
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Failed to read contacts from localStorage:', error);
      return [];
    }
  });

  const [filter, setFilter] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('contacts', JSON.stringify(contacts));
      }
    } catch (error) {
      console.error('Failed to save contacts to localStorage:', error);
    }
  }, [contacts]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts.`);
      return;
    }

    setContacts(prev => [...prev, { name, number }]);
    setName('');
    setNumber('');
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = (nameToDelete) => {
    setContacts(prev => prev.filter(contact => contact.name !== nameToDelete));
  };

  const filteredContacts = getFilteredContacts();

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <input
          className="input"
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces."
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="input"
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <button type="submit" className="addBtn">
          Add contact
        </button>
      </form>

      <div className="filter">
        <label className="label">
          Find contacts by name
          <input
            className="input"
            type="text"
            value={filter}
            onChange={handleFilterChange}
          />
        </label>
      </div>

      <ShowContacts contacts={filteredContacts} deleteContact={deleteContact} />
    </>
  );
};

export default App;
