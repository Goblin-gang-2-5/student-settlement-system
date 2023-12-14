import {configureStore} from "@reduxjs/toolkit";
import userSlice from "@/store/slices/userSlice";

const store = configureStore({
    reducer: {
        user: userSlice
    },
    devTools: process.env.NODE_ENV === "development"
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export function clearStore(){
    store.dispatch({type: "RESET"})
}

export default store