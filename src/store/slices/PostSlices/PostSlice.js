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
export const selectSideContent = (state) => {
  const {activeSide} = state.post;
 
  switch(activeSide){
  case "SharePost":
    return <SharedPost/>
    case "SharePhoto":
      return <SharePhotoNews/>
        default: 
        return <p> Select Side</p> 
  }
}

export const {setActiveSide } = postSlice.actions
export const postReducer = postSlice.reducer