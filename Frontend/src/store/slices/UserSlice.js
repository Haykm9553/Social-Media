import { createSlice } from "@reduxjs/toolkit";
import { fetchGetLogedUser, fetchGetUser } from "./API";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    users: [],        
    profile: null,    
  },
  reducers: {
    uploadPhoto: (state, { payload }) => {
      if (state.profile && Array.isArray(state.profile.Photo)) {
        state.profile.Photo.push(payload);
      }
    },

    editedProfile(state, { payload }) {
      localStorage.setItem("userProfile",JSON.stringify(payload))
    },

    AddNewPhoto(state, { payload }) {
      if (state.profile && Array.isArray(state.profile.photo)) {
        state.profile.photo.push(payload);
      }
    },

    selectPhoto(state, { payload }) {
      if (state.profile && state.profile.photo) {
        state.profile.photo[payload] = {
          ...state.profile.photo[payload],
          active: !state.profile.photo[payload].active,
        };
      }
    },

    deletePhoto(state, { payload }) {
      if (state.profile && state.profile.photo) {
        state.profile.photo.splice(payload, 1);
      }
    },

    SelectPhotoToMain(state, { payload }) {
      if (state.profile && state.profile.photo) {
        state.profile.photo[payload].key = true;
        state.profile.photo[payload].active = false;
      }
    },

    AddFriend(state, { payload }) {
      if (state.profile) {
        state.profile.FriendList.push(payload);
        state.profile.FriendRequest.splice(0, 1);
      }
    },

    RejectFriendRequest(state) {
      if (state.profile) {
        state.profile.FriendRequest.splice(0, 1);
      }
    },

    DeleteFriend(state, { payload }) {
      if (state.profile) {
        state.profile.friend_list = state.profile.friend_list.filter(
          (user) => user.id !== payload.id
        );
      }
    },

    LogOut(state) {
      state.profile = null;
      localStorage.removeItem("userProfile");
      localStorage.removeItem("token");
    },

    LogIn(state, { payload }) {
      state.profile = payload;
      localStorage.setItem("userProfile", JSON.stringify(payload));
    },

    RegUser(state, { payload }) {
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchGetUser.pending, (state) => {})
      .addCase(fetchGetUser.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchGetUser.rejected, (state) => {
        alert("Pending Time Out");
      })
      .addCase(fetchGetLogedUser.pending, (state) => {})
      .addCase(fetchGetLogedUser.fulfilled, (state, { payload }) => {
        state.profile = payload;
      })
      .addCase(fetchGetLogedUser.rejected, (state) => {
        alert("Error");
      });
  },
});

export const UserReducer = UserSlice.reducer;
export const {
  uploadPhoto,
  editedProfile,
  AddNewPhoto,
  selectPhoto,
  deletePhoto,
  SelectPhotoToMain,
  AddFriend,
  DeleteFriend,
  RejectFriendRequest,
  LogOut,
  LogIn,
  RegUser,
} = UserSlice.actions;

export const selectUser = (state) => state.user;
