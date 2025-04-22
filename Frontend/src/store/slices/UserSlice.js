import { createSlice } from "@reduxjs/toolkit";
import { fetchGetLogedUser, fetchGetUser } from "./API";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    users: [],        
    profile: JSON.parse(localStorage.getItem("userProfile")) || JSON.parse(sessionStorage.getItem("userProfile")) || null,   
  },
  reducers: {
    setUsers(state, { payload }) {
      localStorage.setItem("users",JSON.stringify(payload))
    },
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
      localStorage.setItem("token",JSON.stringify(payload))
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
      sessionStorage.removeItem("userProfile");
      sessionStorage.removeItem("token");
    },

    LogInLocal(state, { payload }) {
      state.profile = payload;
      localStorage.setItem("userProfile", JSON.stringify(payload));
    },
    initProfileFromStorage(state) {
      const profileFromLocal = localStorage.getItem("userProfile");
      const profileFromSession = sessionStorage.getItem("userProfile");
  
      if (profileFromLocal) {
        state.profile = JSON.parse(profileFromLocal);
      } else if (profileFromSession) {
        state.profile = JSON.parse(profileFromSession);
      } else {
        state.profile = null;
      }
    },  
    LogInSession(state, { payload }) {
      state.profile = payload;
      sessionStorage.setItem("userProfile", JSON.stringify(payload));
    },


    RegUser(state, { payload }) {
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchGetUser.pending, (state) => {
        
      })
      .addCase(fetchGetUser.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchGetUser.rejected, (state) => {
        alert("Pending Time Out");
      })
      
  },
});

export const UserReducer = UserSlice.reducer;
export const {
  initProfileFromStorage,
  setUsers,
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
  LogInLocal,
  LogInSession,
  RegUser,
} = UserSlice.actions;

export const selectUser = (state) => state.user;
