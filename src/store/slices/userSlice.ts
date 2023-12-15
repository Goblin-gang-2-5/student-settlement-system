import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {
            email: "",
            name: "",
            avatarUrl: "",
            createAt: new Date(),
            role: "user"
        }
    },
    reducers: {
        setUserData(state, action){
            state.user = {...action.payload}
        }
    }
})

export const {setUserData} = userSlice.actions
export default userSlice.reducer