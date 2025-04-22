import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGetUser = createAsyncThunk(
    "user/fetchGetUser", 
    async ()=> {
        const result= await fetch("http://localhost:8000/api/users")
        const jsonResult = await result.json()
        return jsonResult
    }
)


