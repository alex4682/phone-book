import React from 'react';
import {deleteContact} from '../redux/actions'

const addContext = React.createContext();

const ShowReviews = ({ contacts = [], deleteContact }) => {

  return (
    <ul className="list">
      {Array.isArray(contacts) && contacts.length > 0 && contacts.map((contact, index) => (
        <li key={index} className="listItem">
          <p className="contact">
            {contact.name}: {contact.number}
          </p>
          <button
            onClick={() => deleteContact(contact.number)}
            className="deleteBtn"
          >
            delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export { addContext };
export default ShowReviews;
