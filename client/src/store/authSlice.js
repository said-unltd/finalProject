import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const signup = createAsyncThunk('auth/signup', async({ username, name, surname, email, password}, thunkAPI) => {
    try {
        const res = await axios.post('http://localhost:8080/signup', { username, name, surname, email, password });
        return res.data;
    } catch (err) {
        console.log(err);
        return thunkAPI.rejectWithValue(err.message)
    }
})

export const signin = createAsyncThunk('auth/signin', async({ username, name, surname, email, password}, thunkAPI) => {
    try {
        const res = await axios.post('http://localhost:8080/signin', { username, name, surname, email, password });
        return res.data;
    } catch (err) {
        console.log(err);
        return thunkAPI.rejectWithValue(err.response.data)
    }
})

export const addItem = createAsyncThunk('auth/additem', async({ collectionId, user, userId, name, description, file, formData}, thunkAPI) => {
    try {
        const res = await axios.post('http://localhost:8080/additem', { headers: { "Content-Type": "multipart/form-data" }, collectionId, user, userId, name, description, file, formData });
        return res.data;
    } catch (err) {
        console.log(err);
        return thunkAPI.rejectWithValue(err.response.data)
    }
})

export const createCollection = createAsyncThunk('auth/createcollection', async({ user, userId, name, description, image, string1State, string1Name, string2State, string2Name, string3State, string3Name, int1State, int1Name, int2State, int2Name, int3State, int3Name, description1State, description1Name, description2State, description2Name, description3State, description3Name, bool1State, bool1Name, bool2State, bool2Name, bool3State, bool3Name, date1State, date1Name, date2State, date2Name, date3State, date3Name, formData}, thunkAPI) => {
    try {
        const res = await axios.post('http://localhost:8080/createcollection', { headers: { "Content-Type": "multipart/form-data" }, user, userId, name, description, image, string1State, string1Name, string2State, string2Name, string3State, string3Name, int1State, int1Name, int2State, int2Name, int3State, int3Name, description1State, description1Name, description2State, description2Name, description3State, description3Name, bool1State, bool1Name, bool2State, bool2Name, bool3State, bool3Name, date1State, date1Name, date2State, date2Name, date3State, date3Name, formData });
        return res.data;
    } catch (err) {
        console.log(err);
        return thunkAPI.rejectWithValue(err.response.data)
    }
})

export const getCollection = createAsyncThunk('auth/collection', async({ user, name, description, file, formData}, thunkAPI) => {
    try {
        const res = await axios.post('http://localhost:8080/createcollection', { headers: { "Content-Type": "multipart/form-data" }, user, name, description, file, formData });
        return res.data;
    } catch (err) {
        console.log(err);
        return thunkAPI.rejectWithValue(err.response.data)
    }
})

const initialState = {
    user: '',
    userId: undefined,
    isLoggedIn: false,
    loading: false,
    error: null,
    currentCollection: undefined,
    itemViewId: undefined,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state, action) => {
            state.user = '';
            state.userId = undefined;
            state.isLoggedIn = false;
            state.loading = false;
            state.error = null;
            state.currentCollection = undefined;
            state.itemViewId = undefined;
        },
        setCurrentCollection: (state, action) => {
            state.currentCollection = action.payload;
        },
        setItemViewId: (state, action) => {
            state.itemViewId = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
                .addCase(signup.fulfilled, (state, action) => {
                    state.user = action.payload.username;
                    state.userId = action.payload.userId;
                    state.isLoggedIn = true;
                    state.loading = false;
                    state.error = null;
                })
                .addCase(signup.pending, (state, action) => {
                    state.loading = true;
                })
                .addCase(signup.rejected, (state, action) => {
                    state.loading = false;
                    state.isLoggedIn = false;
                    state.error = action.payload;
                })
                .addCase(signin.fulfilled, (state, action) => {
                    console.log(action.payload);
                    state.user = action.payload.username;
                    state.userId = action.payload.userId;
                    state.isLoggedIn = true;
                    state.loading = false;
                    state.error = null;
                })
                .addCase(signin.pending, (state, action) => {
                    state.loading = true;
                })
                .addCase(signin.rejected, (state, action) => {
                    state.loading = false;
                    state.isLoggedIn = false;
                    state.error = action.payload;
                })

                // .addCase(createCollection.fulfilled, (state, action) => {
                //     state.collectionName = action.payload.name;
                //     state.isLoggedIn = true;
                //     state.loading = false;
                //     state.error = null;
                // })
                // .addCase(createCollection.pending, (state, action) => {
                //     state.loading = true;
                // })
                // .addCase(createCollection.rejected, (state, action) => {
                //     state.loading = false;
                //     state.error = action.payload;
                // })
                // .addCase(getCollection.fulfilled, (state, action) => {
                //     state.collectionName = action.payload.name;
                //     state.loading = false;
                //     state.error = null;
                // })
                // .addCase(getCollection.pending, (state, action) => {
                //     state.loading = true;
                // })
                // .addCase(getCollection.rejected, (state, action) => {
                //     state.loading = false;
                //     state.error = action.payload;
                // })
    }
})



export const { logout } = authSlice.actions;
export const { setCurrentCollection } = authSlice.actions;
export const { setItemViewId } = authSlice.actions;

export default authSlice.reducer;