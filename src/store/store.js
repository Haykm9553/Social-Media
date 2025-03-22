import { configureStore } from "@reduxjs/toolkit";
import { UserReducer } from "./slices/UserSlice";
import { sectionReducer } from "./slices/SectionSlice/SectionSlice";
import { newsReducer } from "./slices/NewsSlices/NewsSlice";
import { postReducer } from "./slices/PostSlices/PostSlice";
import { projectReducer } from "./slices/ProjectSlices/ProjectSlice"
import { tableUserReducer } from "./slices/FirstUserSlice/FirstUserSlice";

export const store = configureStore({
  reducer: {
    user: UserReducer,
    section: sectionReducer,
    post: postReducer,
    news: newsReducer,
    project: projectReducer,
    tableUser: tableUserReducer
  },
});
