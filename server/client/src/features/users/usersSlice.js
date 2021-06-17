import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiAxios from "../../config/axiosConfig";

export const fetchCurrentUser = createAsyncThunk(
  "users/fetchCurrentUser",
  async () => {
    const response = await apiAxios.get("/users/self");
    return response.data;
  }
);

export const fetchAllUser = createAsyncThunk("users/fetchAllUser", async () => {
  const response = await apiAxios.get("/users");
  const users = {};
  response.data.forEach((user) => (users[user.id] = user));
  return users;
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  const response = await apiAxios.delete(`users/${id}`);
  return response.status;
});

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    allUser: {},
    currentUser: {},
    currentUserStatus: "idle",
    allUserStatus: "idle",
    deleteUserStatus: "idle",
    isLoggedIn: false,
  },
  reducers: {
    isLoggedInUpdated(state, action) {
      state.isLoggedIn = action.payload;
    },
    //Clear user info when logging out
    currentUserUpdated(state, action) {
      state.currentUser = action.payload;
    },
    //Used to reset user status on logout
    currentUserStatusUpdated(state, action) {
      state.currentUserStatus = action.payload;
    },
  },
  extraReducers: {
    [fetchCurrentUser.pending]: (state, action) => {
      state.currentUserStatus = "loading";
    },
    [fetchCurrentUser.fulfilled]: (state, action) => {
      state.currentUserStatus = "succeeded";
      state.currentUser = action.payload;
    },
    [fetchCurrentUser.rejected]: (state, action) => {
      state.currentUserStatus = "failed";
    },
    [fetchAllUser.pending]: (state, action) => {
      state.allUserStatus = "loading";
    },
    [fetchAllUser.fulfilled]: (state, action) => {
      state.allUserStatus = "succeeded";
      state.allUser = action.payload;
    },
    [fetchAllUser.rejected]: (state, action) => {
      state.allUserStatus = "failed";
    },
    [deleteUser.pending]: (state, action) => {
      state.deleteUserStatus = "loading";
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.deleteUserStatus = "succeeded";
    },
    [deleteUser.rejected]: (state, action) => {
      state.deleteUserStatus = "failed";
    },
  },
});

export const {
  isLoggedInUpdated,
  currentUserUpdated,
  currentUserStatusUpdated,
} = usersSlice.actions;
export const selectCurrentUserStatus = (state) => state.users.currentUserStatus;
export const selectAllUserStatus = (state) => state.users.allUserStatus;
export const selectDeleteUserStatus = (state) => state.users.deleteUserStatus;
export const selectAllUser = (state) => state.users.allUser;
export const selectCurrentUser = (state) => state.users.currentUser;
export const selectIsLoggedIn = (state) => state.users.isLoggedIn;
export default usersSlice.reducer;
