import { createAction } from "@reduxjs/toolkit";

const addContact = createAction('ADD_CONTACT');
const deleteContact = createAction('DELETE_CONTACT');
const setFilter = createAction('SET_FILTER');

export {addContact, deleteContact, setFilter};