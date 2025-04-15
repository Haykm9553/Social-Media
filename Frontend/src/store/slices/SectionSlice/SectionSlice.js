import { createSlice } from "@reduxjs/toolkit";
import MyFriends from "../../../Pages/MyProfilePage/MyInfo/MyFriends/MyFriends";
import UploadPhoto from "../../../Pages/MyProfilePage/MyInfo/UploadPhoto/UploadPhoto";
import AboutMe from "../../../Pages/MyProfilePage/MyInfo/AboutMe/AboutMe";
import { useSelector } from "react-redux";
import { selectUser } from "../UserSlice";
import AboutMeEdit from "../../../Pages/MyProfilePage/MyInfo/AboutMe/AboutMeEdit/AboutMeEdit";

const sectionSlice = createSlice({
  name: "section",
  initialState: {
    activeSection: "Info",
  },
  reducers: {
    setActiveSection: (state, { payload}) => {
      state.activeSection = payload;
    },
    
  },
});
export const selectSectionContent = (state) => {
  const { activeSection } = state.section;
  switch (activeSection) {
    case "Info":
      return <AboutMe/> 
    case "Friends":
      return <MyFriends />;
    case "Photo":
      return <UploadPhoto/>;
    case "Edit":
      return <AboutMeEdit/>
    default:
      return <p>Select Section</p>
  }
};
  
export const { setActiveSection } = sectionSlice.actions;
export const sectionReducer = sectionSlice.reducer; 

