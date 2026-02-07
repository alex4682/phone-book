import React, { useState } from 'react';
import '../App.css';
import ShowContacts from './ShowContacts';
import {addContact, deleteContact, setFilter} from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';


const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (contacts.find(contact => contact.number === number)) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = { name, number };
    dispatch(addContact(newContact));
    setName('');
    setNumber('');
  };

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const handleDeleteContact = (name) => {
    dispatch(deleteContact(name));
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

      <ShowContacts contacts={filteredContacts} deleteContact={handleDeleteContact} />
    </>
  );
};

export default App;
