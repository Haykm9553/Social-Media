import React from 'react'
import { AddTask, ChangeTask, CheckTask, DeleteTask, EditTask, selectProject } from "../../../store/slices/ProjectSlices/ProjectSlice"
import { useDispatch, useSelector } from 'react-redux'
import CheckButton from "../../../SVG/CheckButton"
import DeleteButton from "../../../SVG/DeleteButton"
import EditButton from "../../../SVG/EditButton"
import "./ToDoList.css"

const ToDoList = () => {
    const dispatch = useDispatch()
    const{task} = useSelector(selectProject)
    const handlerSubmit = (e)=> {
        e.preventDefault()
        const [input]=e.target
       if (input.value) {
        dispatch(AddTask({inputText: input.value, isChecked: false, isEditing: false}))
       }
        e.target.reset()
    }
    return (
        <div className='ToDoList'>
        <div className="header">
        <h1>To Do List </h1>
        <h3>Redux, Slicer</h3>
        <form className="input-wrapper" onSubmit={(e)=>handlerSubmit(e)}>
            <input type="text" placeholder='Type your task...' className="input"/>
            <button className='ToDoButton'>Submit</button>
        </form>
        <hr/>
        </div>

        <div className="ToDoBody">
        {
          task.map((e,index)=>{
           if (e.isEditing) {
            return(
                <div key={index} className='ToDoBodyList'>
                    <form className="input-wrapper" onSubmit={(e)=>{
                        e.preventDefault()
                        const [input]=e.target
                        dispatch(ChangeTask({inputText: input.value, taskIndex: index}))
                        e.target.reset()
                    }}>
                    <input defaultValue={e.text} className='input'/>
                    </form>
                </div>
             ) 
           }
           else {
            return(
                <div key={index} className={e.isChecked ? 'CheckedTask' : 'ToDoBodyList'}>
                    <i onClick={()=>dispatch(CheckTask(index))} > <CheckButton/></i>
                    <p>{e.text}</p> 
                    <i onClick={()=>dispatch(EditTask(index))} ><EditButton/></i>
                    <i onClick={()=>dispatch(DeleteTask(index))} ><DeleteButton/></i>
                </div>
             ) 
           }
        })
        }
        </div>

    </div>
    )
}

export default ToDoList