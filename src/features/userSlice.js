import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import modal from "../utility/modal";
import axios from "axios";

const token = localStorage.getItem('token')

const config = {
    headers: { Authorization: `Bearer ${token}`}
};
export const getUsers = createAsyncThunk("users/getUsers", async () => {
    const response = await axios.get(modal.getUsers, config);
    return response.data.users;
})

export const saveUser = createAsyncThunk("users/saveUser", async (initialPost) => {
    try {
        const response = await axios.post(modal.saveUsers, initialPost, config);
        return response.data;
      } catch (err) {
        return err.message;
    }
})

export const updateUsers = createAsyncThunk(
    "users/updateUsers",
    async (initialPost) => {
        try {
            var url = modal.updateUsers
            const response = await axios.post(url, initialPost, config);
            return response.data;
        } catch (err) {
            return err.message;
        }
    }
);

export const deleteUser = createAsyncThunk("users/deleteUser", async (initialPost) => {
    const { id } = initialPost;
    try {
        var url =`${modal.deleteUsers}?user_id=${id}`
        const response = await axios.delete(url, config);
        if (response?.status === 200) return initialPost;
        return `${response?.data.success}: ${response?.data.id}`;
    } catch (err) {
        return err.message;
    }
})

const userSlice = createSlice({
    name: "users",
    initialState : {
        value : [],
        status : 'idle',
        error: null,
    },
    extraReducers(builder){
        builder.addCase(getUsers.pending, (state, action) => {
            state.status = 'loading'
        }).addCase(getUsers.fulfilled, (state, action) => {
            state.status = 'success'
            state.value = action.payload
        }).addCase(getUsers.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.error.message;
        }).addCase(saveUser.pending, (state, action) => {
            state.status = 'loading'
        }).addCase(saveUser.fulfilled, (state, action) => {
            state.status = 'success'
            state.value = state.value.concat(action.payload.data);
        }).addCase(saveUser.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.error.message;
        }).addCase(updateUsers.fulfilled, (state, action) => {
            console.log("masukkkkk oiii", action.payload);
            state.value.map((u) => {
                if (u.id === action.payload.user.id) {
                    u.name = action.payload.user.name;
                    u.email = action.payload.user.email;
                    u.created_at = action.payload.user.created_at
                }
            });
        }).addCase(deleteUser.pending, (state, action) => {
            state.status = 'loading'
        }).addCase(deleteUser.fulfilled, (state, action) => {
            state.status = 'success'
            const { id } = action.payload;
            const value = state.value.filter((user) => user.id !== id);
            state.value = value;
        }).addCase(deleteUser.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
    }
})

export default userSlice.reducer