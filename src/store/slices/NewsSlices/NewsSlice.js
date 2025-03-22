import { createSlice } from "@reduxjs/toolkit";
import { fetchGetNewsLent } from "../API";

const newsSlice = createSlice({
    name: "news",
    initialState: [],
    reducers: {

      AddPost(state,{payload}){        
        state.push(payload)
      },
      
      EditableStatus(state, {payload}){
        state.map((el)=>{
          return el.id===payload.id ? el.isEditing=!el.isEditing : el
        })
      },

      EditPost(state, {payload}){
        state.map((e)=>{
          if (e.id===payload.item.id) {
            e.isEditing=!e.isEditing
            return e.post = payload.value
          }else return e
        })
      },

      DeletePost(state, {payload}){
        state.map((el,index)=> {
         return el.id=== payload.id ? state.splice(index,1): el
        })
      }
    },
    extraReducers: (builder)=> {
        builder.addCase(fetchGetNewsLent.pending, (state,{payload})=> {
        } )
        .addCase(fetchGetNewsLent.fulfilled,(state, {payload})=> {
          state.push(...payload)
        })
        .addCase(fetchGetNewsLent.rejected, (state, {payload})=> {
         alert("Pending Time Out")
        })
    }
})

export const newsReducer = newsSlice.reducer
export const {EditableStatus, AddPost, EditPost, DeletePost}= newsSlice.actions
export const selectNews = (state)=>state.news