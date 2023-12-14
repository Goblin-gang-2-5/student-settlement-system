import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice(({
    name: "user",
    initialState: {
        email: "",
        name: "",
        avatarUrl: "",
        createAt: new Date()
    },
    reducers: {
        setUser(state, action){
            state.name = action.payload.name
            state.email = action.payload.email
            state.avatarUrl = action.payload.avatarUrl
            state.createAt = action.payload.createAt

        }
    }
}))

export const {setUser} = userSlice.actions
export default userSlice.reducer