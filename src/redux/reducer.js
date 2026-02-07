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

export const Reducer = (state = initialState, action) => {
  if (!state.contacts) {
    state.contacts = [];
  }
  switch (action.type) {
    case 'ADD_CONTACT':
        const newState = {
            ...state,
            contacts: [...state.contacts, action.payload]
        };
        saveToLocalStorage(newState.contacts);
        return newState;
    case 'DELETE_CONTACT':
        const updatedState = {
            ...state,
            contacts: state.contacts.filter(contact => contact.name !== action.payload)
        };
        saveToLocalStorage(updatedState.contacts);
        return updatedState;
    case 'SET_FILTER':
        return {
            ...state,
            filter: action.payload
        }
    default:
        return state;
  }
}