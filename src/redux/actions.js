const addContact = (contact) => ({
    type: 'ADD_CONTACT',
    payload: contact
});

const deleteContact = (name) => ({
    type: 'DELETE_CONTACT',
    payload: name
});

const setFilter = (filter) => ({
    type: 'SET_FILTER',
    payload: filter
});

export {addContact, deleteContact, setFilter};