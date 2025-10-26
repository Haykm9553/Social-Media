import { createSlice } from "@reduxjs/toolkit";




const newsSlice = createSlice({
  name: "news",
  initialState: {
    posts: []
  },
  reducers: {
    AddPost: (state, {payload}) => {
      
      state.posts.unshift(payload);
    },
    RemovePost: (state, action) => {
      state.posts = state.posts.filter(post => post.id !== action.payload.id);
    },
    EditPost: (state, action) => {
      const index = state.posts.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state.posts[index].content = action.payload.value;
      }
    },
  },
});

export const { AddPost, RemovePost, EditPost } = newsSlice.actions;

export const selectNews = (state) => state.news.posts;

export const newsReducer = newsSlice.reducer;
