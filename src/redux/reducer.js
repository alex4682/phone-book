import { createReducer } from "@reduxjs/toolkit";
import { addContact, deleteContact, setFilter } from "./actions";

const initialState = {
    contacts: (() => {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
            const saved = localStorage.getItem('contacts');
            return saved ? JSON.parse(saved) : [];
        }
      } catch (error) {
        console.error('Failed to read contacts from localStorage:', error);
        return [];
      }
      return [];
    })(),
    filter: ''
};


const saveToLocalStorage = (contacts) => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  } catch (error) {
    console.error('Failed to save contacts to localStorage:', error);
  }
};

export const Reducer = createReducer(initialState, (builder) => {
    builder
        .addCase(addContact, (state, action) => {
            state.contacts.push(action.payload);
            saveToLocalStorage(state.contacts);
        })
        .addCase(deleteContact, (state, action) => {
            state.contacts = state.contacts.filter(contact => contact.number !== action.payload);
            saveToLocalStorage(state.contacts);
        })
        .addCase(setFilter, (state, action) => {
            state.filter = action.payload;
        });
});