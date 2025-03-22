import { createSlice } from "@reduxjs/toolkit";
import ToDoList from "../../../Pages/ProjectPage/ToDoList/ToDoList";
import UserTable from "../../../Pages/ProjectPage/UserTable/UserTable";

const ProjectSlice = createSlice({
    name: "project",
    initialState: {
      projectSection: "",
      task: []
    },
    reducers: {
        setProjectSection: (state, { payload}) => {
            state.projectSection = payload;
          },
          AddTask(state,{payload}){
            state.task.push({text: payload.inputText})
          },
          ChangeTask(state, {payload}){
            state.task.map((el,index)=>{
                if (index===payload.taskIndex) {
                    el.isEditing = !el.isEditing
                   return el.text = payload.inputText
                 }
            })
          },
          CheckTask(state, {payload}){
            state.task.map((el,index)=>{
             return  index===payload?  el.isChecked = !el.isChecked: el
            })
          },
          EditTask(state, {payload}){
            state.task.map((el,index)=>{
              return  index===payload ? el.isEditing = !el.isEditing : el
            })
          },
          DeleteTask(state,{payload}){
            state.task.splice(payload,1)
          }
    },
  });
  export const selectProjectContent = (state) => {
    const { projectSection} = state.project;
    switch (projectSection) {
      case "ToDo":
        return <ToDoList/>
        case "UserTable":
          return <UserTable/>
      default: return <div className="SelectProject"><p >Select Project</p></div>
    }
  };
  export const {setProjectSection, AddTask, ChangeTask, CheckTask, EditTask, DeleteTask} = ProjectSlice.actions;
  export const projectReducer = ProjectSlice.reducer;
  export const selectProject = (state)=>state.project