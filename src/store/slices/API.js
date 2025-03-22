import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGetUser = createAsyncThunk(
    "user/fetchGetUser", 
    async ()=> {
        const result= await fetch("http://localhost:3005/users_Data")
        const jsonResult = await result.json()
        return jsonResult
    }
)


export const fetchGetLogedUser = createAsyncThunk(
    "user/fetchGetLogedUser", 
    async ()=> {
        const result= await fetch("http://localhost:3005/Loged_User")
        const jsonResult = await result.json()
        return jsonResult
    }
)


export const fetchGetNewsLent = createAsyncThunk(
    "news/fetchGetNewsLent", 
    async ()=> {
        const result= await fetch("http://localhost:3005/News_Lent")
        const jsonResult = await result.json()
        return jsonResult
    }
)