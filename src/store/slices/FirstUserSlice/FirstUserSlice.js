import { createSlice } from "@reduxjs/toolkit"

const tableUserSlice = createSlice({
    name: "tableUser",
    initialState: {
        FirstUser: [],
        SecondUser: [],
        ThirdUser: [],
        PopedUser:[],
    },
    reducers: {
        addFirstUser: (state, {payload}) => {
            state.FirstUser.push({firstName: payload.firstName, lastName: payload.lastName, age: payload.age})
        },
        addSecondUser: (state, {payload}) => {
            state.SecondUser.push({firstName: payload.firstName, lastName: payload.lastName, age: payload.age})
        },
        addThirdUser: (state, {payload}) => {
            state.ThirdUser.push({firstName: payload.firstName, lastName: payload.lastName, age: payload.age})
        },
        changeFirstUser: (state, {payload}) => {
            state.FirstUser.splice(payload, 1)
        },
        addToPopedUser: (state, {payload}) => {
            state.PopedUser.push(payload)
        },
        addToSecondUser: (state, {payload}) => {
            state.SecondUser.push(payload)
            state.PopedUser.length = 0
        },
        addToThiredUser: (state, {payload}) => {
            state.ThirdUser.push(payload)
            state.PopedUser.length = 0
        },
        addToFirstUser: (state, {payload}) => {
            state.FirstUser.push(payload)
            state.PopedUser.length = 0
        },
        changeSecondUser: (state, {payload}) => {
            state.SecondUser.splice(payload, 1)
        },
        changeThirdUser: (state, {payload}) => {
            state.ThirdUser.splice(payload, 1)
        }
        
    }
})



export const tableUserReducer = tableUserSlice.reducer
export const {
    addFirstUser,
    addSecondUser,
    addThirdUser,
    addToPopedUser,
    changeFirstUser,
    addToSecondUser,
    addToThiredUser,
    addToFirstUser,
    changeThirdUser,
    changeSecondUser
 } = tableUserSlice.actions
export const selectTableUser = (state) => state.tableUser