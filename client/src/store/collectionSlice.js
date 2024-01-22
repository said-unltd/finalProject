import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// export const signup = createAsyncThunk('auth/signup', async({ username, name, surname, email, password}, thunkAPI) => {
//     try {
//         const res = await axios.post('http://localhost:8080/signup', { username, name, surname, email, password });
//         return res.data;
//     } catch (err) {
//         console.log(err);
//         return thunkAPI.rejectWithValue(err.message)
//     }
// })

// export const signin = createAsyncThunk('auth/signin', async({ username, name, surname, email, password}, thunkAPI) => {
//     try {
//         const res = await axios.post('http://localhost:8080/signin', { username, name, surname, email, password });
//         return res.data;
//     } catch (err) {
//         console.log(err);
//         return thunkAPI.rejectWithValue(err.response.data)
//     }
// })

// export const addItem = createAsyncThunk('auth/additem', async({ user, name, description, file, formData}, thunkAPI) => {
//     try {
//         const res = await axios.post('http://localhost:8080/additem', { headers: { "Content-Type": "multipart/form-data" }, user, name, description, file, formData });
//         return res.data;
//     } catch (err) {
//         console.log(err);
//         return thunkAPI.rejectWithValue(err.response.data)
//     }
// })

export const createCollection = createAsyncThunk('collection/createcollection', async({ user, name, description, file, formData}, thunkAPI) => {
    try {
        const res = await axios.post('http://localhost:8080/createcollection', { headers: { "Content-Type": "multipart/form-data" }, user, name, description, file, formData });
        return res.data;
    } catch (err) {
        console.log(err);
        return thunkAPI.rejectWithValue(err.response.data)
    }
})

export const getCollection = createAsyncThunk('collection/getcollection', async({ user, name, description, file, formData}, thunkAPI) => {
    try {
        const res = await axios.post('http://localhost:8080/createcollection', { headers: { "Content-Type": "multipart/form-data" }, user, name, description, file, formData });
        return res.data;
    } catch (err) {
        console.log(err);
        return thunkAPI.rejectWithValue(err.response.data)
    }
})
const initialState = {
    collectionName: '',
    loading: false,
    error: null
}

export const collectionSlice = createSlice({
    name: 'collection',
    initialState,
    reducers: {
        logout: (state, action) => {
            state.collectionName = '';
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
                .addCase(createCollection.fulfilled, (state, action) => {
                    state.collectionName = action.payload.name;
                    state.isLoggedIn = true;
                    state.loading = false;
                    state.error = null;
                })
                .addCase(createCollection.pending, (state, action) => {
                    state.loading = true;
                })
                .addCase(createCollection.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                })
                .addCase(getCollection.fulfilled, (state, action) => {
                    state.collectionName = action.payload.name;
                    state.loading = false;
                    state.error = null;
                })
                .addCase(getCollection.pending, (state, action) => {
                    state.loading = true;
                })
                .addCase(getCollection.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                })
    }
})



export const { logout } = collectionSlice.actions
export default collectionSlice.reducer;