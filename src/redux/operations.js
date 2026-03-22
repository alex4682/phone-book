import axios from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";
axios.defaults.baseURL = "https://69be768717c3d7d977921a7b.mockapi.io/tasklist/";

export const fetchNumber = createAsyncThunk(
    "tasks/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get("/phonebook");
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addNumber = createAsyncThunk(
    "tasks/addTask",
    async (contact, { rejectWithValue }) => {
        try {
            const { data } = await axios.post("/phonebook", contact);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteNumber = createAsyncThunk(
    "tasks/deleteTask",
    async (number, { rejectWithValue }) => {
        try {
            await axios.delete(`/phonebook/${number}`);
            return number;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
