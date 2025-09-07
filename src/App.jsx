import { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
    name: '',
    number: ''
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;

    if (this.state.contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts.`);
      form.reset();
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, { name: name, number: number }]
    }));

    form.reset();
  }

  handleFilterChange = (e) => {
    this.setState({ filter: e.target.value });
  }

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }

  deleteContact = (name) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.name !== name)
    }));
  }

  render() {
    const filteredContacts = this.getFilteredContacts();

    return (
      <>
        <form onSubmit={this.handleSubmit} className='form'>
          <input
          className='input'
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <input
          className='input'
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          <button type="submit" className='addBtn'>Add contact</button>
        </form>

        <div className='filter'>
          <label
            className='label'>
            Find contacts by name
            <input
              className='input'
              type="text"
              value={this.state.filter}
              onChange={this.handleFilterChange}
            />
          </label>
        </div>

        <ul className='list'>
          {filteredContacts.map((contact, index) => (
            <li key={index} className='listItem'>
              <p className='contact'>{contact.name}: {contact.number}</p>
              <button onClick={() => this.deleteContact(contact.name)} className='deleteBtn'>delete</button>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default App;