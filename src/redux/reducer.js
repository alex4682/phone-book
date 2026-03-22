import { createSlice } from "@reduxjs/toolkit";
// import { addContact, deleteContact, setFilter } from "./actions";
import { fetchNumber, addNumber, deleteNumber } from "./operations";
const initialState = {
    contacts: [],
    filter: ''
};


// const saveToLocalStorage = (contacts) => {
//   try {
//     if (typeof window !== 'undefined' && window.localStorage) {
//       localStorage.setItem('contacts', JSON.stringify(contacts));
//     }
//   } catch (error) {
//     console.error('Failed to save contacts to localStorage:', error);
//   }
// };

// export const Reducer = createReducer(initialState, (builder) => {
//     builder
//         .addCase(addContact, (state, action) => {
//             state.contacts.push(action.payload);
//             saveToLocalStorage(state.contacts);
//         })
//         .addCase(deleteContact, (state, action) => {
//             state.contacts = state.contacts.filter(contact => contact.number !== action.payload);
//             saveToLocalStorage(state.contacts);
//         })
//         .addCase(setFilter, (state, action) => {
//             state.filter = action.payload;
//         });
// });

export const Slice = createSlice({
  name: 'phoneBook',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNumber.fulfilled, (state, action) => {
        state.contacts = action.payload;
      })
      .addCase(addNumber.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
      })
      .addCase(deleteNumber.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(contact => contact.number !== action.payload);
      });
  }

})

export const { addContact, deleteContact, setFilter } = Slice.actions;
export default Slice.reducer;