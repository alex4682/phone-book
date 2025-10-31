import React, { useContext } from 'react';

const addContext = React.createContext();

const ShowReviews = ({ deleteContact }) => {
  const filteredContacts = useContext(addContext);

  return (
    <ul className="list">
      {filteredContacts.map((contact, index) => (
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
