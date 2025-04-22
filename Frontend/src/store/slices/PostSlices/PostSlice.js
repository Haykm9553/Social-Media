import { createSlice } from "@reduxjs/toolkit";
import SharePhotoNews from "../../../components/ShareSide/Share/SharePhotoNews/SharePhotoNews";
import SharedPost from "../../../components/ShareSide/Share/SharedPost/SharedPost";

const postSlice = createSlice({
    name: "Post",
    initialState: {
      activeSide: "SharePost",
    },
    reducers: {
      setActiveSide: (state, {payload}) => {
        state.activeSide = payload;
      },          
    }
})
export const selectActiveSide = (state) => state.post.activeSide;

export const {setActiveSide } = postSlice.actions
export const postReducer = postSlice.reducer