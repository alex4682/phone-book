import React from 'react';

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
            onClick={() => deleteContact(contact.name)}
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
