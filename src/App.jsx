import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('contacts') : null;
      return saved ? JSON.parse(saved) : [];
    } catch (error) {=
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
    const form = e.target;
    const nameValue = name;
    const numberValue = number;

    if (contacts.find(contact => contact.name === nameValue)) {
      alert(`${nameValue} is already in contacts.`);
      form.reset();
      return;
    }

    setContacts(prevContacts => [...prevContacts, { name: nameValue, number: numberValue }]);
    setName('');
    setNumber('');
    form.reset();
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

  const deleteContact = (name) => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.name !== name));
  };

  const filteredContacts = getFilteredContacts();

  return (
    <>
      <form onSubmit={handleSubmit} className='form'>
        <input
          className='input'
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className='input'
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <button type="submit" className='addBtn'>
          Add contact
        </button>
      </form>

      <div className='filter'>
        <label className='label'>
          Find contacts by name
          <input
            className='input'
            type="text"
            value={filter}
            onChange={handleFilterChange}
          />
        </label>
      </div>

      <ul className='list'>
        {filteredContacts.map((contact, index) => (
          <li key={index} className='listItem'>
            <p className='contact'>
              {contact.name}: {contact.number}
            </p>
            <button onClick={() => deleteContact(contact.name)} className='deleteBtn'>
              delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;