import { createSlice } from "@reduxjs/toolkit";
import { fetchGetLogedUser, fetchGetUser } from "./API";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    User_Data: [],
    Loged_User_Data: [],
  },
  reducers: {
    uploadPhoto: (state, { payload }) => {
      state.Loged_User_Data[0].Photo.push(payload);
    },
    updateUserProfile(state, action) {
      state.Loged_User_Data = [action.payload];
    },
    editProfile(state) {
      state.Loged_User_Data[0].isEditing = true;
    },
    editedProfile(state, { payload }) {
      state.Loged_User_Data.splice(0, 1);
      state.Loged_User_Data.push(payload);
    },
    AddNewPhoto(state, { payload }) {
      state.Loged_User_Data[0].Photo.push(payload);
    },
    selectPhoto(state, { payload }) {
      state.Loged_User_Data[0].Photo[payload] =
        {...state.Loged_User_Data[0].Photo[payload], active: !state.Loged_User_Data[0].Photo[payload].active}
    },
    deletePhoto(state, { payload }) {
      state.Loged_User_Data[0].Photo.splice(payload, 1);
    },
    SelectPhotoToMain(state, { payload }) {
      state.Loged_User_Data[0].Photo[payload].key = true
      state.Loged_User_Data[0].Photo[payload].active = false
    },
    
    AddFriend(state, {payload}){
      state.Loged_User_Data[0]?.FriendList.push(payload)
      state.Loged_User_Data[0]?.FriendRequest.splice(0,1)
    },

    RejectFriendRequest (state){
      state.Loged_User_Data[0]?.FriendRequest.splice(0,1)
    },

    DeleteFriend(state,{payload}){
      state.Loged_User_Data[0].FriendList.map((user, index)=>{
        return user.id===payload.id ? state.Loged_User_Data[0].FriendList.splice(index,1): user
      })
      },
      LogOut(state){
        state.Loged_User_Data = []
      },
      LogIn(state, {payload}){
        state.Loged_User_Data.push(payload)
      },
      RegUser(state, {payload}){
        state.User_Data.push(payload)
      }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchGetUser.pending, (state, { payload }) => {})
      .addCase(fetchGetUser.fulfilled, (state, { payload }) => {
        state.User_Data = payload;
      })
      .addCase(fetchGetUser.rejected, (state, { payload }) => {
        alert("Pending Time Out");
      })
      .addCase(fetchGetLogedUser.pending, (state, { payload }) => {})
      .addCase(fetchGetLogedUser.fulfilled, (state, { payload }) => {
        state.Loged_User_Data = payload;
      })
      .addCase(fetchGetLogedUser.rejected, (state, { payload }) => {
        alert("Pending Time Out");
      });
  },
});

export const UserReducer = UserSlice.reducer;
export const {
  uploadPhoto,
  updateUserProfile,
  editProfile,
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
  RegUser

} = UserSlice.actions;
export const selectUser = (state) => state.user;
